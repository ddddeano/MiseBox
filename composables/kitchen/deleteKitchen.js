<!-- composables/kitchen/deleteKitchen.js -->
import { useFirestore, useCurrentUser } from "vuefire";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteKitchen = async (kitchen) => {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();

  console.log("[deleteKitchen] Attempting to delete kitchen:", kitchen);

  if (!currentUser.value) {
    console.error("[deleteKitchen] User not authenticated.");
    return false;
  }

  if (kitchen.added_by !== currentUser.value.uid) {
    console.error("[deleteKitchen] Unauthorized deletion attempt.");
    return false;
  }

  try {
    const kitchenDocRef = doc(firestore, "kitchens", kitchen.kitchenId);
    await deleteDoc(kitchenDocRef);

    console.log("[deleteKitchen] Kitchen deleted successfully.");
    return true;
  } catch (error) {
    console.error("[deleteKitchen] Error deleting kitchen:", error);
    return false;
  }
};
