// composables/EntityManagers/professional/professionalCreate.js
// ============================
// composables/EntityManagers/professional/professionalCreate.js
// ============================
import { arrayUnion, } from 'firebase/firestore';

export function useProfessionalCreate() {
  const { createEntity, updateEntity } = useMiseboxFirestore();

  const createProfessional = async (newProfessional) => {
    try {
      if (!newProfessional || typeof newProfessional !== "object") {
        throw new Error("[createProfessional] Invalid input. Must be an object.");
      }

      // Save the Professional profile in Firestore
      await createEntity("professionals", { ...newProfessional });
      console.log("[createProfessional] Professional profile created successfully:", newProfessional);

      // Update the Misebox User's user_apps field
      await updateEntity("misebox-users", {
        user_apps: arrayUnion("professionals"),
      });
      console.log("[createProfessional] Misebox User's user_apps updated with 'professionals'.");
    } catch (error) {
      console.error("[createProfessional] Error creating Professional profile:", error.message);
      throw error;
    }
  };

  return { createProfessional };
}
