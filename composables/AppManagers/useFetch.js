// composables/useFetch.js
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export function useFetch(collection, documentId) {
  const firestore = useFirestore();
  const documentData = ref(null);

  onMounted(async () => {
    try {
      const docRef = doc(firestore, collection, documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        documentData.value = docSnapshot.data();
      } else {
        console.error(`Document with ID ${documentId} not found in collection ${collection}`);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  });

  return { documentData };
}
