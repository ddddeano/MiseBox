import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";

export const useSupplier = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Get the current user's Supplier profile
  const currentSupplierDocRef = computed(() =>
    currentUser.value ? doc(db, "suppliers", currentUser.value.uid) : null
  );
  const { data: currentSupplier } = useDocument(currentSupplierDocRef);

  // Create a new Supplier profile
  const createSupplier = async (data = {}) => {
    if (!currentUser.value) {
      console.error("[useSupplier] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const supplierRef = doc(db, "suppliers", uid);

    const supplierData = {
      id: uid,
      createdAt: new Date().toISOString(),
      ...data, // Additional data passed during creation
    };

    try {
      await setDoc(supplierRef, supplierData);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion("suppliers"),
      });

      console.log("[useSupplier] Supplier profile created successfully.");
    } catch (error) {
      console.error("[useSupplier] Error creating Supplier profile:", error);
    }
  };

  // Delete the current Supplier profile
  const deleteSupplier = async () => {
    if (!currentUser.value) {
      console.error("[useSupplier] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const supplierRef = doc(db, "suppliers", uid);

    try {
      await deleteDoc(supplierRef);

      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove("suppliers"),
      });

      console.log("[useSupplier] Supplier profile deleted successfully.");
    } catch (error) {
      console.error("[useSupplier] Error deleting Supplier profile:", error);
    }
  };

  return {
    currentSupplier: computed(() => currentSupplier?.value || null),
    createSupplier,
    deleteSupplier,
  };
};
