<template>
  <div class="creating">
    <ErrorMessage :error="error" />

    <div class="upload-section">
      <input type="file" @change="handleFileChange" />
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Image Preview" />
      </div>
    </div>

    <ArrowUpCircleIcon 
      @click.stop="clickUpdate" 
      class="upload-icon icon" 
    />
    <div v-if="uploadProgress > 0" class="progress-bar">
      <div :style="{ width: `${uploadProgress}%` }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline';

const firestore = useFirestore();
const storage = getStorage();

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
});

const error = ref({ message: '' });
const selectedFile = ref(null);
const imagePreview = ref('');
const uploadProgress = ref(0);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const clickUpdate = async () => {
  if (!selectedFile.value) {
    error.value = 'No file selected. Please choose an image to upload.';
    return;
  }

  const file = selectedFile.value;
  const fileRef = storageRef(storage, `images/${props.userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (err) => {
      error.value = `Upload failed: ${err.message}`;
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateFirestoreWithImageURL({ url: downloadURL });
      } catch (err) {
        error.value = `Failed to save image URL: ${err.message}`;
      } finally {
        resetForm();
      }
    }
  );
};

const updateFirestoreWithImageURL = async (imageObject) => {
  try {
    const documentRef = doc(firestore, props.collectionName, props.userId);
    await updateDoc(documentRef, {
      gallery: arrayUnion(imageObject),
    });
    console.log('Image successfully uploaded and URL saved to Firestore.');
  } catch (err) {
    error.value = 'Failed to update Firestore with image URL.';
    console.error('Failed to update Firestore with image URL:', err);
  }
};

const resetForm = () => {
  selectedFile.value = null;
  imagePreview.value = '';
  uploadProgress.value = 0;
};
</script>

<style scoped>
.upload-section {
  display: flex;
  flex-direction: column;
  gap: var(--margin-small);
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: var(--corner-radius-small);
}

.progress-bar {
  width: 100%;
  background-color: var(--background-muted);
  height: 4px;
  border-radius: var(--corner-radius-small);
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  background-color: var(--primary-color);
}
</style>
