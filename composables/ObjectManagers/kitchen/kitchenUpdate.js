// composables/ObjectManagers/kitchen/kitchenUpdate.js
// ============================
// composables/ObjectManagers/kitchen/kitchenUpdate.js
// ============================


export function useKitchenUpdate() {
  const { updateDocument } = useMiseboxFirestore();

  const updateKitchen = async (kitchenId, updates) => {
    try {
      if (!kitchenId || typeof kitchenId !== "string") {
        throw new Error("[updateKitchen] Kitchen ID is required and must be a string.");
      }

      if (!updates || typeof updates !== "object") {
        throw new Error("[updateKitchen] Updates must be a valid object.");
      }

      // Update the kitchen document in Firestore
      await updateDocument("kitchens", kitchenId, updates);

      console.log(`[updateKitchen] Kitchen ${kitchenId} updated successfully:`, updates);
    } catch (error) {
      console.error("[updateKitchen] Error updating kitchen:", error.message);
      throw error;
    }
  };

  return { updateKitchen };
}
