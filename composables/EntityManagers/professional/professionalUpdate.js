// composables/EntityManagers/professional/professionalUpdate.js
// ============================
// composables/EntityManagers/professional/professionalUpdate.js
// ============================
import { useCurrentUser } from "vuefire";

export function useProfessionalUpdate() {
  const { updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const updateProfessional = async (updates) => {
    try {
      const professionalId = currentUser.value?.uid;
      if (!professionalId) throw new Error("[updateProfessional] No authenticated user found.");

      // Update the professional document
      await updateEntity("professionals", professionalId, updates);

      console.log("[updateProfessional] Professional profile updated successfully:", updates);
    } catch (error) {
      console.error("[updateProfessional] Error updating Professional profile:", error.message);
      throw error;
    }
  };

  return { updateProfessional };
}
