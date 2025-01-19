// composables/ObjectManagers/kitchen/kitchenDelete.js
// ============================
// composables/ObjectManagers/kitchen/kitchenDelete.js
// ============================

export function useKitchenDelete() {
  const { deleteDocument } = useMiseboxFirestore();
  const { removeChefFromKitchen } = useKitchenLinking();

  const deleteKitchen = async (kitchen) => {
    try {
      if (!kitchen || typeof kitchen !== "object" || !kitchen.id) {
        throw new Error("[deleteKitchen] Kitchen object with a valid ID is required.");
      }

      const { id: kitchenId, current_team = [] } = kitchen;

      // Remove references to this kitchen from all chefs in the current team
      if (Array.isArray(current_team)) {
        await Promise.all(
          current_team.map(async (chef) => {
            if (chef.id) {
              await removeChefFromKitchen(kitchenId, chef.id);
              console.log(`[deleteKitchen] Removed kitchen ${kitchenId} from chef ${chef.id}`);
            }
          })
        );
      }

      // Delete the kitchen document from Firestore
      await deleteDocument("kitchens", kitchenId);

      console.log(`[deleteKitchen] Kitchen ${kitchenId} successfully deleted.`);
    } catch (error) {
      console.error("[deleteKitchen] Error deleting kitchen:", error.message);
      throw error;
    }
  };

  return { deleteKitchen };
}
