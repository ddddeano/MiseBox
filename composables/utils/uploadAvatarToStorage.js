// composables/Utils/uploadAvatarToStorage.js
// composables/utils/uploadAvatarToStorage.js
// composables/utils/uploadAvatar.js

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Resizes and compresses an image to a specific width and height.
 * @param {File|Blob} file - The original image file or blob.
 * @param {number} maxWidth - The maximum width of the resized image.
 * @param {number} maxHeight - The maximum height of the resized image.
 * @returns {Promise<Blob>} The resized and compressed image as a Blob.
 */
export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => (img.src = e.target.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.7);
    };
  });
};

/**
 * Uploads a file to Firebase Storage and retrieves its download URL.
 * @param {string} path - The storage path for the file.
 * @param {Blob} file - The file to upload.
 * @returns {Promise<string>} The download URL of the uploaded file.
 */
export const uploadFileAndGetURL = async (path, file) => {
  const storage = getStorage();
  const avatarRef = storageRef(storage, path);
  await uploadBytes(avatarRef, file);
  return await getDownloadURL(avatarRef);
};

/**
 * Handles the avatar upload process by resizing and uploading both the main avatar and mini avatar.
 * @param {File|Blob} file - The original image file or blob.
 * @param {string} avatarPath - Path in Firebase Storage for the main avatar.
 * @param {string} miniAvatarPath - Path in Firebase Storage for the mini avatar.
 * @returns {Promise<{ avatar: string, avatar_mini: string }>} The URLs of the uploaded avatars.
 */
export const handleAvatarUpload = async (file, avatarPath, miniAvatarPath) => {
  try {
    const [standardAvatar, miniAvatar] = await Promise.all([
      resizeImage(file, 200, 200),
      resizeImage(file, 50, 50),
    ]);

    const [avatarUrl, avatarMiniUrl] = await Promise.all([
      uploadFileAndGetURL(avatarPath, standardAvatar),
      uploadFileAndGetURL(miniAvatarPath, miniAvatar),
    ]);

    return {
      avatar: avatarUrl,
      avatar_mini: avatarMiniUrl,
    };
  } catch (error) {
    console.error("[handleAvatarUpload] Error handling avatar upload:", error);
    throw error;
  }
};
