// composables/EntityManagers/miseboxUser/miseboxUserUpdate.js
import { useCurrentUser } from "vuefire";

export function useMiseboxUserUpdate() {
  const { updateDocument } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const updateMiseboxUser = async (updates) => {
    const id = currentUser.value?.uid;
    if (!id) throw new Error("[updateMiseboxUser] No authenticated user found.");
    try {
      await updateDocument("misebox-users", id, updates);
      console.log("[updateMiseboxUser] Misebox User updated successfully.");
    } catch (error) {
      console.error("[updateMiseboxUser] Error updating Misebox User:", error);
      throw error;
    }
  };

  return { updateMiseboxUser };
}
