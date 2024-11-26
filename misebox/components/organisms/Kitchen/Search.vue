<!-- components/Kitchens/Search.vue -->

<template>
  <div class="kitchen-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="debouncedSearch"
      placeholder="Search for a kitchen..."
      class="editable-input"
    />
    <div class="dropdown kitchen-search-dropdown" v-if="mergedResults.length > 0">
      <OrganismsKitchenFirebaseSearchResult
        v-for="result in firestoreResults"
        :key="result.place_id"
        :kitchen="result"
        @select="selectKitchen"
      />
      <OrganismsKitchenGoogleSearchResult
        v-for="result in googleResults"
        :key="result.place_id"
        :kitchen="result"
        @select="selectKitchen"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFirestore, useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import { useGoogleMapsLoader } from '@/composables/useSearch';

const emit = defineEmits(['select-kitchen']); // Emit the selected kitchen to the parent

// Firestore search setup
const firestore = useFirestore();
const searchQuery = ref('');
const collectionRef = collection(firestore, 'kitchens');
const { data: firestoreData } = useCollection(collectionRef);

// Split search query into lowercase words for filtering
const splitSearchQuery = computed(() => {
  return searchQuery.value.trim().toLowerCase().split(' ').filter(word => word);
});

// Filter Firestore data based on the search query
const filteredFirestoreData = computed(() => {
  if (!firestoreData.value || searchQuery.value.length < 3) return [];

  return firestoreData.value.filter((item) => {
    const searchPhraseLower = item.search_phrase.toLowerCase();
    return splitSearchQuery.value.every(queryWord => searchPhraseLower.includes(queryWord));
  }).map((item) => ({
    place_name: item.name || '',
    formatted_address: item.formatted_address || '',
    place_id: item.place_id || '',
    photo_url: item.photo_url || null,
    country: item.country || '',       
    region: item.region || '',         
    city: item.city || '',             
    source: 'firestore'
  }));
});

// Google search setup
const googleSearch = ref([]);

// Import Google Maps loader and debouncer
const { initializeGoogleSearch, debouncedFunction } = useGoogleMapsLoader();

// Combine Firestore and Google results without duplicates
const mergedResults = computed(() => {
  const firestorePlaceIds = new Set(filteredFirestoreData.value.map(item => item.place_id.trim()));
  const uniqueGoogleResults = googleSearch.value.filter(googleItem => !firestorePlaceIds.has(googleItem.place_id.trim()));

  return [
    ...filteredFirestoreData.value,
    ...uniqueGoogleResults.map(item => ({ 
      place_name: item.place_name || '',
      formatted_address: item.formatted_address || '',
      place_id: item.place_id || '',
      photo_url: item.photo_url || null,
      country: item.country || '',
      region: item.region || '',
      city: item.city || '',
      source: 'google'
    }))
  ];
});

// Separate Firestore and Google results for respective components
const firestoreResults = computed(() => filteredFirestoreData.value);
const googleResults = computed(() => mergedResults.value.slice(firestoreResults.value.length));

// Handle kitchen selection and emit event
const selectKitchen = (kitchen) => {
  emit('select-kitchen', kitchen); // Emit selected kitchen to parent component
  searchQuery.value = ''; // Clear the search input
  googleSearch.value = []; // Clear Google search results
};

// Handle debounced search query with Google API
const debouncedSearch = debouncedFunction(async () => {
  if (searchQuery.value.length >= 3) {
    googleSearch.value = await initializeGoogleSearch(searchQuery.value);
  } else {
    googleSearch.value = [];
  }
}, 300); // 300ms delay for debouncing
</script>
