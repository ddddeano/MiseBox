<template>
  <div class="search-bar">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="searchQuery"
      @input="debouncedInput"
    />
    <ul v-if="searchResults.length > 0">
      <li
        v-for="(item, index) in searchResults"
        :key="index"
        class="result-item"
        @click="selectPlace(item)"
      >
        <img v-if="item.photo_url" :src="item.photo_url" alt="Place photo" class="place-photo" />
        <div class="place-details">
          <p>{{ item.place_name }}</p>
          <p>{{ item.formatted_address }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['item-click']);
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
});

const searchQuery = ref('');
const searchResults = ref([]);

// Function to fetch places based on the search query
const fetchPlaces = async (query) => {
  const google = await loadGoogleMapsScript();
  
  const service = new google.maps.places.PlacesService(document.createElement('div'));
  const request = {
    query,
    fields: ['name', 'formatted_address', 'place_id', 'photos'], // Request formatted_address instead of address_components
  };

  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      searchResults.value = results.map(place => {
        console.log("Place Object:", place); // Log the entire place object for debugging

        // Extract the URL of the first photo, if available
        const photo_url = place.photos && place.photos.length > 0 
          ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })  // Limiting size for thumbnails
          : null;

        // Creating an object structure for each place result
        return {
          place_name: place.name,          // The name of the place
          formatted_address: place.formatted_address || "", // The formatted address
          place_id: place.place_id,        // The unique place ID
          photo_url: photo_url             // The URL of the first photo, or null if not available
        };
      });
    } else {
      console.error('Failed to fetch places:', status);
      searchResults.value = [];
    }
  });
};

// Debounce function to delay API call and prevent excessive requests
let debounceTimeout;
const debouncedInput = () => {
  clearTimeout(debounceTimeout);
  if (searchQuery.value.length >= 3) {
    debounceTimeout = setTimeout(() => {
      fetchPlaces(searchQuery.value);
    }, 300);
  } else {
    searchResults.value = [];
  }
};

// Function to handle place selection
const selectPlace = (item) => {
  emit('item-click', item);  // Emit the selected place object
  searchQuery.value = ''; 
  searchResults.value = []; 
};

// Load the Google Maps script when the component is mounted
onMounted(async () => {
  await loadGoogleMapsScript();
});
</script>

<style scoped>
.search-bar {
  position: relative;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.place-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.place-details {
  flex-grow: 1;
}
</style>
