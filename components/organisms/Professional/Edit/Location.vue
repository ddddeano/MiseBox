<!-- components/organisms/Professional/Edit/LocationForm.vue -->
<template>
  <div class="location-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      <p>{{ location.city }} - {{ location.distance }} km</p>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'">
      <PlacesBar
        @item-click="selectPlace"
        placeholder="Search for city..."
      />
      <input
        type="number"
        v-model="localLocation.distance"
        placeholder="Distance (km)"
        class="editable-input"
        min="0"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      <PlacesBar
        @item-click="selectPlace"
        placeholder="Search for city..."
      />
      <input
        type="number"
        v-model="localLocation.distance"
        placeholder="Distance (km)"
        class="editable-input"
        min="0"
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

const emit = defineEmits(['update:location']);

const localLocation = ref({ ...props.location });

// Watch for changes in the prop to update local state
watch(
  () => props.location,
  (newVal) => {
    localLocation.value = { ...newVal };
  }
);

// Method to handle place selection from PlacesBar
const selectPlace = (place) => {
  localLocation.value.city = place;
  emit('update:location', { ...localLocation.value });
};
</script>

<style scoped>
.location-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.editable-input {
  padding: 8px;
  font-size: 1em;
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
}
</style>
