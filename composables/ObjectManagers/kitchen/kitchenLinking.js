// composables/ObjectManagers/kitchen/kitchenLinking.js
// ============================
// composables/ObjectManagers/kitchen/kitchenLinking.js
// ============================

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useFirestore } from "vuefire";

export function useKitchenLinking() {
  const db = useFirestore();

  const team = ref([]);

  function getTeam(kitchenId) {
    if (!kitchenId) throw new Error("Kitchen ID is missing.");

    const kitchenRef = doc(db, "kitchens", kitchenId);
    onSnapshot(kitchenRef, (snapshot) => {
      if (snapshot.exists()) {
        const kitchenData = snapshot.data();
        team.value = kitchenData.current_team || [];
      } else {
        console.error(`Kitchen ${kitchenId} does not exist.`);
        team.value = [];
      }
    });

    return team;
  }

  async function addChefToKitchen(kitchenId, chef) {
    if (!kitchenId || !chef) throw new Error("Kitchen ID or Chef data is missing.");

    const kitchenRef = doc(db, "kitchens", kitchenId);
    await updateDoc(kitchenRef, {
      current_team: arrayUnion({ id: chef.id }),
    });
    console.log(`Chef ${chef.id} added to kitchen ${kitchenId}`);
  }

  async function removeChefFromKitchen(kitchenId, chefId) {
    if (!kitchenId || !chefId) throw new Error("Kitchen ID or Chef ID is missing.");

    const kitchenRef = doc(db, "kitchens", kitchenId);
    await updateDoc(kitchenRef, {
      current_team: arrayRemove({ id: chefId }),
    });
    console.log(`Chef ${chefId} removed from kitchen ${kitchenId}`);
  }

  return { getTeam, addChefToKitchen, removeChefFromKitchen };
}
