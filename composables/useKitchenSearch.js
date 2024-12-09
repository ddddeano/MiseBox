import { ref, computed } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { useGoogleMapsLoader } from '@/composables/useSearch'

export const useKitchenSearch = () => {
  const firestore = useFirestore()
  const kitchensRef = collection(firestore, 'kitchens')

  const searchQuery = ref('')
  const firestoreResults = ref([])
  const googleResults = ref([])
  const firestorePlaceIds = ref([])

  // Normalize string for search matching
  const normalizeString = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

  // Fetch Google Place IDs from Firestore
  const fetchFirestorePlaceIds = async () => {
    try {
      const querySnapshot = await getDocs(kitchensRef)
      firestorePlaceIds.value = querySnapshot.docs
        .map((doc) => doc.data().google_places_id)
        .filter(Boolean)
    } catch (error) {
      console.error('Error fetching Firestore Place IDs:', error)
    }
  }

  // Search Firestore for kitchens
  const searchFirestore = async () => {
    if (searchQuery.value.length < 3) {
      firestoreResults.value = []
      return
    }

    const normalizedQuery = normalizeString(searchQuery.value.trim())
    try {
      const querySnapshot = await getDocs(kitchensRef)
      firestoreResults.value = querySnapshot.docs
        .map((doc) => ({
          kitchenId: doc.id,
          ...doc.data(),
          source: 'firestore',
        }))
        .filter((result) => {
          const normalizedSearchPhrase = normalizeString(
            result.search_phrase || ''
          )
          return normalizedSearchPhrase.includes(normalizedQuery)
        })
    } catch (error) {
      console.error('Error searching Firestore:', error)
    }
  }

  // Search Google for kitchens
  const searchGoogle = async () => {
    if (searchQuery.value.length < 3) {
      googleResults.value = []
      return
    }

    try {
      const { initializeGoogleSearch } = useGoogleMapsLoader()
      const results = await initializeGoogleSearch(searchQuery.value.trim())

      googleResults.value = results.map((result) => ({
        ...result,
        kitchenId: result.place_id, // Align with Firestore's `kitchenId`
        place_name: result.place_name, // Align with Firestore's `place_name`
        formatted_address: result.formatted_address, // Address
        google_places_id: result.place_id, // Keep the Google Places ID
        source: 'google',
      }))
    } catch (error) {
      console.error('Error searching Google:', error)
    }
  }

  // Merge Firestore and Google Results
  const mergedResults = computed(() => {
    const filteredGoogleResults = googleResults.value.filter(
      (googleResult) => !firestorePlaceIds.value.includes(googleResult.place_id)
    )
    return [...firestoreResults.value, ...filteredGoogleResults]
  })

  return {
    searchQuery,
    firestoreResults,
    googleResults,
    firestorePlaceIds,
    mergedResults,
    fetchFirestorePlaceIds,
    searchFirestore,
    searchGoogle,
  }
}
