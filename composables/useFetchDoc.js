<!-- composables/useFetchDoc.js -->
// composables/useFetchDoc.js
import { doc } from "firebase/firestore";
import { useFirestore, useCurrentUser, useDocument } from "vuefire";
import { computed } from "vue";

export const useFetchDoc = (collection, docId) => {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Compute the Firestore document reference only if the user is authenticated
  const documentRef = computed(() =>
    currentUser.value ? doc(db, collection, docId) : null
  );

  const { data: document } = useDocument(documentRef);

  return { document };
};
