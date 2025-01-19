// ============================
// composables/ObjectManagers/supplier/useSupplier.js
// ============================
import { useFirestore, useDocument, useCollection, useCurrentUser } from "vuefire";
import { doc, collection } from "firebase/firestore";

export function useSupplier() {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  // Current Supplier Document
  const currentSupplierRef = computed(() =>
    currentUser.value ? doc(db, "suppliers", currentUser.value.uid) : null
  );
  const { data: currentSupplier } = useDocument(currentSupplierRef);

  // Fetch a specific supplier by ID
  function fetchSupplier(id) {
    const supplierRef = computed(() =>
      currentUser.value && id ? doc(db, "suppliers", id) : null
    );
    const { data: supplier } = useDocument(supplierRef);
    return supplier;
  }

  // Fetch all suppliers
  function fetchSuppliers() {
    const suppliersRef = computed(() =>
      currentUser.value ? collection(db, "suppliers") : null
    );
    const { data: suppliers } = useCollection(suppliersRef);
    return suppliers;
  }


  return {
    ...useSupplierCreate(),
    ...useSupplierUpdate(),
    ...useSupplierDelete(),
    ...useSupplierLinking(),
    ...useSupplierSubcollection(),
    ...useSupplierSearch(),
    currentSupplier,
    fetchSupplier,
    fetchSuppliers,
  };
}
