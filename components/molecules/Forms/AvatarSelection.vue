<!-- components/molecules/forms/AvatarSelection.vue -->
<template>
  <div class="form-field">
    <div class="avatar-container">
      <!-- Display the user's or kitchen's avatar -->
      <MoleculesAvatar
        :url="item.avatar || '/images/default-avatar.jpg'"
        size="large"
        altText="User Avatar"
      />

      <!-- Camera icon overlay -->
      <label class="camera">
        <CameraIcon class="icon" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Props: collection name and item (user or kitchen object)
const props = defineProps({
  collectionName: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

const firestore = useFirestore();
const storage = getStorage();

/**
 * Handles the file input change event to upload and update the avatar.
 * @param {Event} event - The file input change event.
 */
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    // Paths for avatar images in Firebase Storage
    const itemId = props.item.id;
    const avatarPath = `${props.collectionName}/${itemId}/avatar.jpg`;
    const avatarMiniPath = `${props.collectionName}/${itemId}/avatar-mini.jpg`;

    // Resize and upload both standard and mini avatars
    const [standardAvatar, miniAvatar] = await Promise.all([
      resizeImage(file, 200, 200),
      resizeImage(file, 50, 50),
    ]);

    const [avatarUrl, avatarMiniUrl] = await Promise.all([
      uploadFileAndGetURL(avatarPath, standardAvatar),
      uploadFileAndGetURL(avatarMiniPath, miniAvatar),
    ]);

    // Update Firestore document with new avatar URLs
    const docRef = doc(firestore, props.collectionName, itemId);
    await updateDoc(docRef, { avatar: avatarUrl, avatar_mini: avatarMiniUrl });

    console.log("Avatar updated successfully:", { avatarUrl, avatarMiniUrl });

    // Optionally update the local item to reflect changes immediately
    props.item.avatar = avatarUrl;
    props.item.avatar_mini = avatarMiniUrl;
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
};

/**
 * Uploads a file to Firebase Storage and retrieves its download URL.
 * @param {string} path - The storage path for the file.
 * @param {Blob} file - The file to upload.
 * @returns {Promise<string>} The download URL of the uploaded file.
 */
const uploadFileAndGetURL = async (path, file) => {
  const avatarRef = storageRef(storage, path);
  await uploadBytes(avatarRef, file);
  return await getDownloadURL(avatarRef);
};

/**
 * Resizes and compresses an image to a specific width and height.
 * @param {File} file - The original image file.
 * @param {number} maxWidth - The maximum width of the resized image.
 * @param {number} maxHeight - The maximum height of the resized image.
 * @returns {Promise<Blob>} The resized and compressed image as a Blob.
 */
const resizeImage = (file, maxWidth, maxHeight) => {
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
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.camera {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: var(--text-secondary);
  background-color: var(--background-strong);
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera:hover {
  color: var(--text-primary);
  background-color: var(--hover);
}

.camera input {
  display: none;
}
</style>
