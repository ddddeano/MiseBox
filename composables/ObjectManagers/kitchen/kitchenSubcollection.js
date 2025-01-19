// composables/ObjectManagers/kitchen/kitchenSubcollection.js
// ============================
// composables/ObjectManagers/kitchen/kitchenSubcollection.js
// ============================

import { useCurrentUser } from "vuefire";

export function useKitchenSubcollection() {
  const currentUser = useCurrentUser();
  const { createSubcollectionHelpers } = useMiseboxFirestore();

  function createKitchenHelpers(subcollectionName) {
    const userId = currentUser.value?.uid;

    if (!userId) throw new Error("[createKitchenHelpers] No authenticated user found.");
    if (!subcollectionName) throw new Error("[createKitchenHelpers] Subcollection name is required.");

    return createSubcollectionHelpers("kitchens", userId, subcollectionName);
  }

  return {
    createKitchenHelpers,
  };
}
