// composables/EntityManagers/chef/chefCreate.js
import { arrayUnion, } from 'firebase/firestore';

export function useChefCreate() {
  const { createEntity, updateEntity } = useMiseboxFirestore();

  const createChef = async (newChef) => {
    try {
      if (!newChef || typeof newChef !== "object") {
        throw new Error("[createChef] Invalid input. Must be an object.");
      }

      // Save the Chef profile in Firestore
      await createEntity("chefs", { ...newChef });
      console.log("[createChef] Chef profile created successfully:", newChef);

      // Update the Misebox User's user_apps field
      await updateEntity("misebox-users", {
        user_apps: arrayUnion("chefs"),
      });
      console.log("[createChef] Misebox User's user_apps updated with 'chefs'.");
    } catch (error) {
      console.error("[createChef] Error creating Chef profile:", error.message);
      throw error;
    }
  };

  return { createChef };
}
