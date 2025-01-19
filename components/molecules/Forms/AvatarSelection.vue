<!-- components/molecules/forms/AvatarSelection.vue -->
<template>
  <div class="form-field">
    <div class="avatar-container">
      <!-- Display the user's or kitchen's avatar -->
      <MoleculesAvatar
        :url="item.avatar"
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

/**
 * Handles the file input change event to upload and update the avatar.
 * @param {Event} event - The file input change event.
 */
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const itemId = props.item.id;
    const avatarPath = `${props.collectionName}/${itemId}/avatar.jpg`;
    const miniAvatarPath = `${props.collectionName}/${itemId}/avatar-mini.jpg`;

    // Use the consolidated utility to handle avatar upload
    const { avatar, avatar_mini } = await handleAvatarUpload(file, avatarPath, miniAvatarPath);

    // Update Firestore document with new avatar URLs
    const docRef = doc(firestore, props.collectionName, itemId);
    await updateDoc(docRef, { avatar, avatar_mini });

    console.log("Avatar updated successfully:", { avatar, avatar_mini });

    // Optionally update the local item to reflect changes immediately
    props.item.avatar = avatar;
    props.item.avatar_mini = avatar_mini;
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
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
