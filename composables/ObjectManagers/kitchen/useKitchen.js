// composables/ObjectManagers/kitchen/useKitchen.js
// ============================
// composables/ObjectManagers/kitchen/useKitchen.js
// ============================

import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useKitchen() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Fetch a specific kitchen by ID
  function fetchKitchen(id) {
    const kitchenRef = computed(() =>
      currentUser.value && id ? doc(db, "kitchens", id) : null
    );
    const { data: kitchen } = useDocument(kitchenRef);
    return kitchen;
  }

  // Fetch all kitchens
  function kitchensCollection() {
    const kitchensRef = computed(() =>
      currentUser.value ? collection(db, "kitchens") : null
    );
    const { data: kitchens } = useCollection(kitchensRef);
    return kitchens;
  }

  // Expose the functionalities
  return {
    ...useKitchenCreate(),
    ...useKitchenUpdate(),
    ...useKitchenDelete(),
    ...useKitchenSearch(),
    ...useKitchenLinking(),
    ...useKitchenSubcollection(),
    fetchKitchen,
    kitchensCollection,
  };
}
