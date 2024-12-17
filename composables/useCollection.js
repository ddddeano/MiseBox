<!-- composables/useCollection.js -->
import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

export const useFetchCollection = (collectionName) => {
  if (!collectionName) {
    throw new Error("Collection name is required.");
  }

  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Dynamically construct the reference to the Firestore collection
  const collectionRef = computed(() =>
    currentUser.value ? collection(db, collectionName) : null
  );

  // Fetch the collection documents
  const { data: collectionData } = useCollection(collectionRef);

  return { collectionData };
};
