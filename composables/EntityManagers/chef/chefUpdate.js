// composables/EntityManagers/chef/chefUpdate.js
// ============================
// composables/EntityManagers/chef/chefUpdate.js
// ============================
import { useCurrentUser } from "vuefire";

export function useChefUpdate() {
  const { updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const updateChef = async (updates) => {
    try {
      const chefId = currentUser.value?.uid;
      if (!chefId) throw new Error("[updateChef] No authenticated user found.");

      // Update the chef document
      await updateEntity("chefs", chefId, updates);

      console.log("[updateChef] Chef profile updated successfully:", updates);
    } catch (error) {
      console.error("[updateChef] Error updating chef profile:", error.message);
      throw error;
    }
  };

  return { updateChef };
}
