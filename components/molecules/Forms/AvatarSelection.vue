<template>
  <div class="component">
    <div class="avatar-container">
      <!-- Display the user's avatar -->
      <MoleculesAvatar :user="user" size="large" />

      <!-- Camera icon overlay -->
      <label class="icon camera-icon">
        <CameraIcon />
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useCurrentUser, useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const firestore = useFirestore();
const storage = getStorage();

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const userId = props.user.id; // Ensure 'id' exists on 'props.user'
      const path = `/${userId}/images/${file.name}`;

      // Upload the image to Firebase Storage
      const fileRef = storageRef(storage, path);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // Update the user's avatar in Firestore
      const userDocRef = doc(firestore, 'misebox-users', userId);
      await updateDoc(userDocRef, { avatar: downloadURL });

      // Optionally update the local user object to reflect the new avatar immediately
      props.user.avatar = downloadURL;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      // Handle the error (e.g., display a notification to the user)
    }
  }
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.camera-icon {
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

.camera-icon:hover {
  color: var(--text-primary);
  background-color: var(--hover)
}

.camera-icon input {
  display: none;
}
</style>
