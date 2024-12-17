<!-- composables/AppManagers/useEntityManager.js -->
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useFirestore, useCurrentUser } from "vuefire";

export function useEntityHelper() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  if (!db) {
    console.error("[useEntityHelper] Firestore instance not found");
    throw new Error("Firestore instance is required.");
  }

  const createEntity = async ({
    collectionName,
    entityData,
    setupData = async () => ({}),
    postCreate = async () => {},
  }) => {
    if (!currentUser.value) {
      console.error("[createEntity] User not authenticated.");
      alert("You must be logged in to create this entity.");
      return null;
    }

    try {
      const additionalData = await setupData();
      const fullEntityData = {
        ...entityData,
        ...additionalData,
        created_by: currentUser.value.uid,
        created_at: new Date().toISOString(),
      };

      const entityCollectionRef = collection(db, collectionName);
      const entityDocRef = await addDoc(entityCollectionRef, fullEntityData);
      const entityId = entityDocRef.id;

      await postCreate(entityId, fullEntityData);

      console.log(`[createEntity] ${collectionName} created successfully with ID:`, entityId);
      return entityId;
    } catch (error) {
      console.error(`[createEntity] Error creating ${collectionName}:`, error);
      alert(`Failed to create ${collectionName}. Please try again.`);
      return null;
    }
  };

  const deleteEntity = async ({
    collectionName,
    entityId,
    preDelete = async () => true,
    postDelete = async () => {},
  }) => {
    if (!currentUser.value) {
      console.error("[deleteEntity] User not authenticated.");
      alert("You must be logged in to delete this entity.");
      return false;
    }

    try {
      const entityDocRef = doc(db, collectionName, entityId);

      const canDelete = await preDelete();
      if (!canDelete) {
        console.error("[deleteEntity] Pre-delete checks failed.");
        return false;
      }

      await deleteDoc(entityDocRef);
      await postDelete();

      console.log(`[deleteEntity] ${collectionName} deleted successfully with ID:`, entityId);
      return true;
    } catch (error) {
      console.error(`[deleteEntity] Error deleting ${collectionName}:`, error);
      alert(`Failed to delete ${collectionName}. Please try again.`);
      return false;
    }
  };

  return {
    createEntity,
    deleteEntity,
  };
}
