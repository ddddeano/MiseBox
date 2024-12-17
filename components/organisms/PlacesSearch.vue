<!-- components/organisms/PlacesSearch.vue -->
<!-- components/PlacesSearch.vue -->
<template>
  <div class="places-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="debouncedSearch"
      placeholder="Search for a place..."
      class="editable-input"
    />
    <div class="dropdown places-search-dropdown" v-if="googleResults.length > 0">
      <div
        v-for="result in googleResults"
        :key="result.place_id"
        class="places-search-result"
        @click="selectPlace(result)"
      >
        <p><strong>{{ result.place_name }}</strong></p>
        <p>{{ result.formatted_address }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGoogleMapsLoader } from '@/composables/useSearch';

const emit = defineEmits(['select-place']); // Emit the selected place to the parent

// State for Google search results
const searchQuery = ref('');
const googleResults = ref([]); // Ensure this matches the template

// Use reusable search functions from useSearch.js
const { initializeGoogleSearch, debouncedFunction } = useGoogleMapsLoader();

// Selected place logic
const selectPlace = (place) => {
  emit('select-place', place); // Emit the selected place to the parent
  searchQuery.value = ''; // Clear search input after selection
  googleResults.value = []; // Clear results after selection
};

// Debounced search handling
const debouncedSearch = debouncedFunction(async () => {
  if (searchQuery.value.length >= 3) {
    googleResults.value = await initializeGoogleSearch(searchQuery.value);
  } else {
    googleResults.value = [];
  }
}, 300); // 300ms debounce delay
</script>
