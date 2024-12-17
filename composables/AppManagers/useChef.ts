import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";

export const useChef = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Get the current user's Chef profile
  const currentChefDocRef = computed(() =>
    currentUser.value ? doc(db, "chefs", currentUser.value.uid) : null
  );
  const { data: currentChef } = useDocument(currentChefDocRef);

  // Create a new Chef profile
  const createChef = async (data = {}) => {
    if (!currentUser.value) {
      console.error("[useChef] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const chefRef = doc(db, "chefs", uid);

    const chefData = {
      id: uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(chefRef, chefData);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion("chefs"),
      });

      console.log("[useChef] Chef profile created successfully.");
    } catch (error) {
      console.error("[useChef] Error creating Chef profile:", error);
    }
  };

  // Delete the current Chef profile
  const deleteChef = async () => {
    if (!currentUser.value) {
      console.error("[useChef] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const chefRef = doc(db, "chefs", uid);

    try {
      await deleteDoc(chefRef);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove("chefs"),
      });

      console.log("[useChef] Chef profile deleted successfully.");
    } catch (error) {
      console.error("[useChef] Error deleting Chef profile:", error);
    }
  };

  return {
    currentChef: computed(() => currentChef?.value || null),
    createChef,
    deleteChef,
  };
};
