<!-- components/organisms/PlaceSearch.vue -->
<template>
  <div class="place-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for an organization..."
      class="editable-input"
    />
    <transition name="dropdown">
      <div class="dropdown search-dropdown" v-if="results.length">
        <div
          v-for="result in results"
          :key="result.id || result.place_id"
          @click="handleSelectPlace(result)"
          class="search-result-item"
        >
          <img
            v-if="result.photo_url"
            :src="result.photo_url"
            alt="Place photo"
            class="result-photo"
          />
          <div class="result-info">
            <div class="result-name">{{ result.place_name }}</div>
            <div class="result-address">{{ result.formatted_address }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { useGoogleMapsLoader } from '~/composables/Utils/useSearch'

const searchQuery = ref('')
const firestoreResults = ref([])
const googleResults = ref([])

const results = computed(() => [
  ...firestoreResults.value,
  ...googleResults.value,
])

const firestore = useFirestore()
const placesRef = collection(firestore, 'places')

// Fetch places from Firestore
const fetchFirestoreResults = async () => {
  if (searchQuery.value.length < 3) return

  const querySnapshot = await getDocs(placesRef)
  firestoreResults.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Fetch places from Google API
const fetchGoogleResults = async () => {
  if (searchQuery.value.length < 3) return

  const { initializeGoogleSearch } = useGoogleMapsLoader()
  googleResults.value = await initializeGoogleSearch(searchQuery.value.trim())
}

// Perform search
const performSearch = async () => {
  firestoreResults.value = []
  googleResults.value = []
  await Promise.all([fetchFirestoreResults(), fetchGoogleResults()])
}

// Emit selected place
const emits = defineEmits(['select-place'])
const handleSelectPlace = (place) => {
  emits('select-place', place) // Emit the selected place
  clearSearch() // Clear the dropdown and input after selection
}

// Clear the search query and results
const clearSearch = () => {
  searchQuery.value = ''
  firestoreResults.value = []
  googleResults.value = []
}
</script>

<style scoped>
.place-search {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  width: 100%;
  max-width: 600px;
}

.search-dropdown {
  position: absolute;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-sm);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
  padding: var(--spacing-s);
  cursor: pointer;
}

.search-result-item:hover {
  background-color: var(--hover);
}

.result-photo {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-s);
  object-fit: cover;
}

.result-info {
  display: flex;
  flex-direction: column;
}

.result-name {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-m);
}

.result-address {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}
</style>
