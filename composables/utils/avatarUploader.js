import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Resize and compress the image
const resizeImage = (blob, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (resizedBlob) => resolve(resizedBlob),
        "image/jpeg",
        0.7
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
};

// Fetch image from server
const fetchImageFromServer = async (photoUrl) => {
  try {
    const response = await fetch(`/api/google-photo?photo_url=${encodeURIComponent(photoUrl)}`);
    if (!response.ok) throw new Error("Failed to fetch image from server");
    return await response.blob();
  } catch (error) {
    console.error("[fetchImageFromServer] Error:", error);
    return null;
  }
};

// Process and upload the avatar
export const processAndUploadAvatar = async (photoUrl, kitchenId) => {
  const storage = getStorage();
  try {
    const originalImage = await fetchImageFromServer(photoUrl);
    if (!originalImage) return { avatarUrl: null, miniAvatarUrl: null };

    const standardAvatar = await resizeImage(originalImage, 200, 200);
    const miniAvatar = await resizeImage(originalImage, 50, 50);

    const avatarPath = `kitchen_images/${kitchenId}/avatar.jpg`;
    const miniAvatarPath = `kitchen_images/${kitchenId}/avatar-mini.jpg`;

    // Upload standard avatar
    const avatarRef = storageRef(storage, avatarPath);
    await uploadBytes(avatarRef, standardAvatar);
    const avatarUrl = await getDownloadURL(avatarRef);

    // Upload mini avatar
    const miniAvatarRef = storageRef(storage, miniAvatarPath);
    await uploadBytes(miniAvatarRef, miniAvatar);
    const miniAvatarUrl = await getDownloadURL(miniAvatarRef);

    return { avatarUrl, miniAvatarUrl };
  } catch (error) {
    console.error("[processAndUploadAvatar] Error:", error);
    return { avatarUrl: null, miniAvatarUrl: null };
  }
};
