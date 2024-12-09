<template>
  <div class="form-field">
    <div class="avatar-container">
      <!-- Display the user's avatar -->
      <MoleculesAvatar :user="user" size="large" />

      <!-- Camera icon overlay -->
      <label class="camera">
        <CameraIcon class="icon" />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useFirestore } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const firestore = useFirestore();
const storage = getStorage();

// Handle file input change for updating the user's avatar image
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const userId = props.user.id; // Ensure 'id' exists on 'props.user'
      const avatarPath = `${userId}/images/avatar.jpg`;
      const avatarMiniPath = `${userId}/images/avatar-mini.jpg`;

      // Resize and optimize the images
      const standardAvatar = await resizeImage(file, 200, 200); // Standard size: 200x200
      const miniAvatar = await resizeImage(file, 50, 50); // Mini size: 50x50

      // Upload standard avatar to Firebase Storage
      const avatarRef = storageRef(storage, avatarPath);
      await uploadBytes(avatarRef, standardAvatar);
      const avatarUrl = await getDownloadURL(avatarRef);

      // Upload mini avatar to Firebase Storage
      const miniAvatarRef = storageRef(storage, avatarMiniPath);
      await uploadBytes(miniAvatarRef, miniAvatar);
      const avatarMiniUrl = await getDownloadURL(miniAvatarRef);

      // Update the user's avatar in Firestore
      const userDocRef = doc(firestore, "misebox-users", userId);
      await updateDoc(userDocRef, {
        avatar: avatarUrl,
        avatar_mini: avatarMiniUrl, // Corrected key for mini avatar
      });

      console.log("Avatar and avatar_mini updated successfully:", {
        avatar: avatarUrl,
        avatar_mini: avatarMiniUrl,
      });

      // Optionally update the local user object to reflect the new avatar immediately
      props.user.avatar = avatarUrl;
      props.user.avatar_mini = avatarMiniUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      // Handle the error (e.g., display a notification to the user)
    }
  }
};

// Utility: Resize and compress the image before uploading
const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = reject;

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate new dimensions
      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.7 // Adjust the quality to reduce file size
      );
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
