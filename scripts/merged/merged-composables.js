
// ============================
// composables/ObjectManagers/kitchen/kitchenLinking.js
// ============================

import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref } from "vue";
import { useFirestore } from "vuefire";

export function useKitchenLinking() {
  const db = useFirestore();

  function getTeam(kitchenId) {
    if (!kitchenId) throw new Error("Kitchen ID is missing.");

    const team = ref([]);

    const kitchenRef = doc(db, "kitchens", kitchenId);
    onSnapshot(kitchenRef, (snapshot) => {
      if (snapshot.exists()) {
        const kitchenData = snapshot.data();
        team.value = kitchenData.current_team || [];
      } else {
        console.error(`Kitchen ${kitchenId} does not exist.`);
        team.value = [];
      }
    });

    return team;
  }

  async function addChefToKitchen(kitchenId, chef) {
    if (!kitchenId || !chef) throw new Error("Kitchen ID or Chef data is missing.");

    const kitchenRef = doc(db, "kitchens", kitchenId);
    await updateDoc(kitchenRef, {
      current_team: arrayUnion({ id: chef.id }),
    });
    console.log(`Chef ${chef.id} added to kitchen ${kitchenId}`);
  }

  async function removeChefFromKitchen(kitchenId, chefId) {
    if (!kitchenId || !chefId) throw new Error("Kitchen ID or Chef ID is missing.");

    const kitchenRef = doc(db, "kitchens", kitchenId);
    await updateDoc(kitchenRef, {
      current_team: arrayRemove({ id: chefId }),
    });
    console.log(`Chef ${chefId} removed from kitchen ${kitchenId}`);
  }

  return { getTeam, addChefToKitchen, removeChefFromKitchen };
}


// ============================
// composables/ObjectManagers/kitchen/kitchenManager.js
// ============================

import { useCurrentUser } from "vuefire";

export function useKitchenManager() {
  const currentUser = useCurrentUser();
  const {
    createObject,
    updateDocument,
    deleteDocument,
    createArrayFieldHelpers,
  } = useMiseboxFirestore();

  const { removeKitchenFromChef } = useChefLinking(); // Destructure the remove function from chef linking

  const onCreate = async (kitchen) => {
    try {
      const updates = {
        id: kitchen.id,
      };
      await updateDocument("kitchens", kitchen.id, updates);
    } catch (error) {
      console.error("[onCreate] Error in post-creation steps:", error);
      throw error;
    }
  };

  const onDelete = async (kitchen) => {
    try {
      if (!kitchen.current_team || !Array.isArray(kitchen.current_team)) {
        throw new Error("[onDelete] Invalid or missing current team.");
      }

      // Remove the kitchen reference from each chef in the current team
      await Promise.all(
        kitchen.current_team.map(async (chef) => {
          if (chef.id) {
            await removeKitchenFromChef(chef.id, kitchen.id);
            console.log(`[onDelete] Kitchen ${kitchen.id} removed from chef ${chef.id}`);
          }
        })
      );

      // Future-proofing: Add additional clean-up logic for linked entities here
      console.log(`[onDelete] Additional clean-up for kitchen: ${kitchen.id}`);
    } catch (error) {
      console.error("[onDelete] Error in post-deletion steps:", error);
      throw error;
    }
  };

  const createKitchen = async (data) => {
    try {
      if (!data.name || !data.formatted_address) {
        throw new Error("[createKitchen] Missing required fields: name, formatted_address.");
      }

      // Add `source` to data
      const kitchenData = {
        ...data,
        source: "firestore",
      };

      // Create object in Firestore
      const kitchen = await createObject("kitchens", kitchenData);
      await onCreate(kitchen);
      return kitchen;
    } catch (error) {
      console.error("[createKitchen] Error creating kitchen:", error);
      throw error;
    }
  };

  const updateKitchen = async (id, updates) => {
    if (!id) throw new Error("[updateKitchen] Kitchen ID is required.");
    try {
      await updateDocument("kitchens", id, updates);
    } catch (error) {
      console.error("[updateKitchen] Error updating kitchen:", error);
      throw error;
    }
  };

  const deleteKitchen = async (kitchen) => {
    if (!kitchen || !kitchen.id) throw new Error("[deleteKitchen] Kitchen object or ID is required.");
    try {
      // Remove references to this kitchen from all chefs in the team
      await onDelete(kitchen);

      // Delete the kitchen document
      await deleteDocument("kitchens", kitchen.id);

      console.log(`[deleteKitchen] Kitchen ${kitchen.id} successfully deleted.`);
    } catch (error) {
      console.error("[deleteKitchen] Error deleting kitchen:", error);
      throw error;
    }
  };

  const createKitchenArrayHelpers = (kitchenId) => {
    if (!kitchenId) throw new Error("[createKitchenArrayHelpers] Kitchen ID is required.");

    const {
      addItem: addKitchenArrayItem,
      updateItem: updateKitchenArrayItem,
      removeItem: removeKitchenArrayItem,
      replaceArray: replaceKitchenArray,
    } = createArrayFieldHelpers("kitchens", () => kitchenId);

    return {
      addKitchenArrayItem,
      updateKitchenArrayItem,
      removeKitchenArrayItem,
      replaceKitchenArray,
    };
  };

  return {
    createKitchen,
    updateKitchen,
    deleteKitchen,
    createKitchenArrayHelpers,
  };
}


// ============================
// composables/ObjectManagers/kitchen/kitchenProcessing.js
// ============================

export function useKitchenProcessing() {
  const kitchenManager = useKitchenManager();

  async function processSelectedKitchen(kitchen) {
    try {
      if (!kitchen) {
        throw new Error("[processSelectedKitchen] No kitchen provided.");
      }

      if (kitchen.source === "firestore") {
        return kitchen; // Return Firestore kitchen directly
      }

      let photoUrl = null;

      // Handle Google photo processing
      if (kitchen.source === "google" && kitchen.photo_url) {
        photoUrl = await processGooglePhoto(kitchen.photo_url);
      }

      // Prepare `formatted_address` with name included
      const formattedAddress = `${kitchen.name || kitchen.place_name}, ${kitchen.formatted_address}`;

      // Normalize kitchen data
      const normalizedData = {
        name: kitchen.name || kitchen.place_name, // Use `name` for manual, `place_name` for Google
        formatted_address: formattedAddress, // Concatenate name and address
        source: "firestore",
        ...(kitchen.source === "google" && { place_id: kitchen.place_id }), // Add `place_id` only for Google kitchens
        ...(photoUrl && { avatar: photoUrl }), // Change output field to `avatar`
      };

      // Create the kitchen in Firestore
      const createdKitchen = await kitchenManager.createKitchen(normalizedData);

      return createdKitchen;
    } catch (error) {
      console.error("[processSelectedKitchen] Error processing kitchen:", error);
      throw error;
    }
  }

  async function processGooglePhoto(photoUrl) {
    try {
      const response = await $fetch('/api/google-photo', {
        params: { photo_url: photoUrl },
      });
      return response.firebaseUrl; // Return the processed URL
    } catch (error) {
      console.error("[processGooglePhoto] Error processing photo:", error);
      throw error;
    }
  }

  return {
    processSelectedKitchen,
  };
}


// ============================
// composables/ObjectManagers/kitchen/kitchenSearch.js
// ============================

import { ref, computed } from 'vue'
import { useFirestore } from 'vuefire'
import { collection, getDocs } from 'firebase/firestore'
import { useGoogleMapsLoader } from '~/composables/Utils/useSearch'

export const useKitchenSearch = () => {
  const firestore = useFirestore()
  const kitchensRef = collection(firestore, 'kitchens')

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
      const querySnapshot = await getDocs(kitchensRef)
      firestorePlaceIds.value = querySnapshot.docs
        .map((doc) => doc.data().place_id) // Fetch place_id
        .filter(Boolean) // Remove null or undefined place_ids
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
    const queryTokens = normalizedQuery.split(/\s+/) // Split query into words

    try {
      const querySnapshot = await getDocs(kitchensRef)
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


// ============================
// composables/ObjectManagers/kitchen/useKitchen.js
// ============================

// ============================
// composables/ObjectManagers/kitchen/useKitchen.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useKitchen() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Fetch a specific kitchen by ID
  function fetchKitchen(id) {
    const kitchenRef = computed(() =>
      currentUser.value && id ? doc(db, "kitchens", id) : null
    );
    const { data: kitchen } = useDocument(kitchenRef);
    return kitchen;
  }

  // Fetch all kitchens
  function kitchensCollection() {
    const kitchensRef = computed(() =>
      currentUser.value ? collection(db, "kitchens") : null
    );
    const { data: kitchens } = useCollection(kitchensRef);
    return kitchens;
  }

  // Expose the functionalities
  return {
    ...useKitchenCreate(),
    ...useKitchenUpdate(),
    ...useKitchenDelete(),
    ...useKitchenSearch(),
    fetchKitchen,
    kitchensCollection,
  };
}

