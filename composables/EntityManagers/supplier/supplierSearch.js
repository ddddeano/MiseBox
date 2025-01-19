// composables/EntityManagers/supplier/supplierSearch.js
import { ref, computed } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { useGoogleMapsLoader } from '~/composables/Utils/useSearch'

export const useSupplierSearch = () => {
  const firestore = useFirestore()
  const suppliersRef = collection(firestore, 'suppliers')

  const searchQuery = ref('')
  const firestoreResults = ref([])
  const googleResults = ref([])
  const firestorePlaceIds = ref([])

  // Normalize string for search matching
  const normalizeString = (str) =>
    str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

  // Fetch Google Place IDs from Firestore
  const fetchFirestorePlaceIds = async () => {
    try {
      const querySnapshot = await getDocs(suppliersRef)
      firestorePlaceIds.value = querySnapshot.docs
        .map((doc) => doc.data().place_id) // Fetch place_id
        .filter(Boolean) // Remove null or undefined place_ids
    } catch (error) {
      console.error('Error fetching Firestore Place IDs:', error)
    }
  }

  // Search Firestore for suppliers
  const searchFirestore = async () => {
    if (searchQuery.value.length < 3) {
      firestoreResults.value = []
      return
    }

    const normalizedQuery = normalizeString(searchQuery.value.trim())
    const queryTokens = normalizedQuery.split(/\s+/) // Split query into words

    try {
      const querySnapshot = await getDocs(suppliersRef)
      firestoreResults.value = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: 'firestore',
        }))
        .filter((result) => {
          const normalizedSearchPhrase = normalizeString(
            `${result.name || ''} ${result.formatted_address || ''}` // Include both name and address
          )
          const searchTokens = normalizedSearchPhrase.split(/\s+/) // Split phrase into words
          return queryTokens.every((token) =>
            searchTokens.some((phraseToken) => phraseToken.includes(token))
          )
        })
    } catch (error) {
      console.error('Error searching Firestore:', error)
    }
  }

  // Search Google for suppliers
  const searchGoogle = async () => {
    if (searchQuery.value.length < 3) {
      googleResults.value = []
      return
    }

    try {
      const { initializeGoogleSearch } = useGoogleMapsLoader()
      const results = await initializeGoogleSearch(searchQuery.value.trim())

      googleResults.value = results.map((result) => ({
        place_id: result.place_id,
        place_name: result.place_name,
        formatted_address: result.formatted_address,
        photo_url: result.photo_url || null,
        source: 'google',
      }))
    } catch (error) {
      console.error('Error searching Google:', error)
    }
  }

  // Merge Firestore and Google Results
  const mergedResults = computed(() => {
    const filteredGoogleResults = googleResults.value.filter(
      (googleResult) => !firestorePlaceIds.value.includes(googleResult.place_id) // Exclude Google results with existing place_id in Firestore
    )
    return [...firestoreResults.value, ...filteredGoogleResults]
  })

  // Clear search query and results
  const clearSearch = () => {
    searchQuery.value = ''
    firestoreResults.value = []
    googleResults.value = []
  }

  return {
    searchQuery,
    firestoreResults,
    googleResults,
    firestorePlaceIds,
    mergedResults,
    fetchFirestorePlaceIds,
    searchFirestore,
    searchGoogle,
    clearSearch,
  }
}
