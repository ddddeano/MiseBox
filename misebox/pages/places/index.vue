<!-- pages/places.vue -->
<template>
  <client-only>
    <div class="search-container">
      <!-- Reusable places search component -->
      <OrganismsPlacesSearch @select-place="selectPlace" />

      <!-- Display the entire selectedPlace object with a truncated photo_url for debugging -->
      

      <!-- Selected Place Display and Confirm Button -->
      <div v-if="selectedPlace" class="selected-place">
        <h3>Selected Place</h3>
        <pre>
        {{ {
          ...selectedPlace,
          photo_url: selectedPlace.photo_url.slice(0, 5) + '...'
        } }}
      </pre>
        <p>Name: {{ selectedPlace.place_name }}</p>
        <p>Address: {{ selectedPlace.formatted_address }}</p>
        <p>City: {{ selectedPlace.city }}</p>
        <p>Region: {{ selectedPlace.region }}</p>
        <p>Country: {{ selectedPlace.country }}</p>
        <button @click="confirmPlace">Confirm Place</button>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';

const selectedPlace = ref(null); // Ref to hold the selected place

// Function to handle the place selection event from PlacesSearch
const selectPlace = (place) => {
  selectedPlace.value = place;
};

// Function to confirm the selected place (e.g., send to the server)
const confirmPlace = () => {
  // Confirm the selected place logic here
  console.log('Place confirmed:', selectedPlace.value);
};
</script>
