<template>
  <div class="event-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <h3>{{ event.name }}</h3>
      <p>Date: {{ event.date }}</p>
      <p>Location: {{ event.location }}</p>
      <p>{{ event.description }}</p>
      <div>
        <DocumentMagnifyingGlassIcon class="icon" @click="openDocument(event.document_url)" />
      </div>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <label for="event-name">Event Name</label>
      <input
        type="text"
        id="event-name"
        v-model="event.name"
        placeholder="Enter event name"
        class="editable-input"
      />

      <label for="date">Date</label>
      <input type="date" id="date" v-model="event.date" class="editable-input" />

      <label for="location">Location</label>
      <input
        type="text"
        id="location"
        v-model="event.location"
        placeholder="Enter location"
        class="editable-input"
      />

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="event.description"
        placeholder="Enter event description"
        class="editable-textarea"
      ></textarea>

      <!-- Document Upload -->
      <div class="document-upload">
        <DocumentPlusIcon class="icon" @click="triggerFileInput" />
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCurrentUser } from 'vuefire';

const currentUser = useCurrentUser();

const props = defineProps({
  event: {
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

const openDocument = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
/* Add any necessary styles */
</style>
