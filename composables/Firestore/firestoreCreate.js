// composables/Firestore/firestoreCreate.js
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useFirestore as vuefireFirestore, useCurrentUser } from "vuefire";

export function useFirestoreCreate() {
  const db = vuefireFirestore();
  const currentUser = useCurrentUser();

  // Helper to create a document with a predefined ID
  async function createEntity(collectionName, data) {
    if (currentUser.value) {
      const documentId = currentUser.value.uid; // Use current user's UID as the ID
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, {
        ...data,
        id: documentId,
        created_at: new Date().toISOString(),
      });
      return docRef.id; // Return the auto-generated ID only
    }
    return Promise.reject("No authenticated user found. Please sign in first.");
  }

  // Helper to create a document with a Firestore-generated ID
  async function createObject(collectionName, data) {
    return currentUser.value
      ? (async () => {
          const collectionRef = collection(db, collectionName);
          
          // Create the document in Firestore and get its reference
          const docRef = await addDoc(collectionRef, {
            ...data,
            created_at: new Date().toISOString(),
            created_by: currentUser.value.uid, // Include `created_by`
          });

          const objectId = docRef.id; // Firestore-generated document ID

          // Set the document's `id` field asynchronously
          setDoc(docRef, { id: objectId }, { merge: true });

          console.log(`[createObject] Object created with ID: ${objectId}`);
          return objectId; // Return the generated ID for future routing
        })()
      : Promise.reject("No authenticated user found. Please sign in first.");
  }

  return {
    createEntity,
    createObject,
  };
}
