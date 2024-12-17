<!-- components/organisms/Chef/Fields/Gallery.vue -->
<template>
  <div class="gallery-item">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <img :src="image.image_url" alt="Gallery Image" />
      <p>{{ image.description }}</p>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <!-- Image Upload -->
      <div class="image-upload">
        <PhotoIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
      </div>

      <img v-if="image.image_url" :src="image.image_url" alt="Gallery Image" />

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="image.description"
        placeholder="Enter image description"
        class="editable-textarea"
      ></textarea>

      <div v-if="isUploading">Uploading... {{ uploadProgress }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: value => ['display', 'edit', 'create'].includes(value),
  },
});

const fileInput = ref(null);
const isUploading = ref(false);
const uploadProgress = ref(0);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  // Implement your file upload logic here
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
