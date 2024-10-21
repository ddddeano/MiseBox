<template>
  <div class="location-form">
    <div v-if="mode === 'display'">
      <p>{{ location.city }} - {{ location.distance }}</p>
    </div>

    <div v-else>
      <input
        v-model="location.city"
        placeholder="City"
        class="editable-input"
      />
      <input
        v-model="location.distance"
        placeholder="Distance (km)"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  location: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
