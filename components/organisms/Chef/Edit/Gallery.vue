<template>
  <div class="gallery-form">
    <div v-if="mode === 'display'">
      <img :src="photo.imageUrl" alt="Culinary Photo" />
      <p><strong>Description:</strong> {{ photo.description }}</p>
    </div>

    <div v-else>
      <input
        v-model="photo.imageUrl"
        placeholder="Image URL"
        class="editable-input"
      />
      <input
        v-model="photo.description"
        placeholder="Description"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photo: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
