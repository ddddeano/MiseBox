// composables/ObjectManagers/ingredient/ingredientSearch.js
import { ref, computed } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";

export const useIngredientSearch = () => {
  const firestore = useFirestore();
  const ingredientsRef = collection(firestore, "ingredients");

  const searchQuery = ref("");
  const firestoreResults = ref([]);

  // Normalize string for search matching
  const normalizeString = (str) =>
    str
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // Remove diacritics
      .toLowerCase();

  // Search Firestore for ingredients
  const searchFirestore = async () => {
    if (searchQuery.value.length < 3) {
      firestoreResults.value = [];
      return;
    }

    const normalizedQuery = normalizeString(searchQuery.value.trim());
    const queryTokens = normalizedQuery.split(/\s+/); // Split query into words

    try {
      const querySnapshot = await getDocs(ingredientsRef);
      firestoreResults.value = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: "firestore",
        }))
        .filter((result) => {
          const normalizedSearchPhrase = normalizeString(result.name || ""); // Search only by name
          const searchTokens = normalizedSearchPhrase.split(/\s+/); // Split name into words
          return queryTokens.every((token) =>
            searchTokens.some((phraseToken) => phraseToken.includes(token))
          );
        });
    } catch (error) {
      console.error("[searchFirestore] Error searching Firestore:", error);
    }
  };

  // Clear search query and results
  const clearSearch = () => {
    searchQuery.value = "";
    firestoreResults.value = [];
  };

  return {
    searchQuery,
    firestoreResults,
    searchFirestore,
    clearSearch,
  };
};
