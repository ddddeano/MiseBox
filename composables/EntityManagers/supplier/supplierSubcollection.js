import { useCurrentUser, useFirestore, useCollection } from "vuefire";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export function useSupplierSubcollection() {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const { createSubObject } = useFirestoreSubcollectionHelpers();

  // Reactive and real-time fetch of a supplier's subcollection (e.g., catalog)
  function fetchSupplierSubCollection(subCollectionName, id = null) {
    const resolvedSupplierId = computed(() => id || currentUser.value?.uid);

    if (!resolvedSupplierId.value) {
      console.warn("[fetchSupplierSubCollection] Supplier ID is not resolved.");
      return null;
    }

    const subCollectionRef = computed(() =>
      collection(db, `suppliers/${resolvedSupplierId.value}/${subCollectionName}`)
    );

    const { data: subCollection } = useCollection(subCollectionRef);
    return subCollection;
  }

  // Add an item to the supplier's subcollection
  async function addSupplierSubcollectionItem(supplierId, subCollectionName, data) {
    if (!supplierId || !subCollectionName || !data) {
      throw new Error("[addSupplierSubcollectionItem] Missing required parameters.");
    }

    try {
      const result = await createSubObject("suppliers", supplierId, subCollectionName, data);
      console.log(`[addSupplierSubcollectionItem] Added item to ${subCollectionName} for supplier ${supplierId}.`);
      return result;
    } catch (error) {
      console.error("[addSupplierSubcollectionItem] Error adding subcollection item:", error.message);
      throw error;
    }
  }

  // Simplified function to add an ingredient to the "catalog"
  async function addIngredientToSupplier(data) {
    if (!currentUser.value?.uid) {
      throw new Error("[addIngredientToSupplier] User must be logged in to add ingredients.");
    }

    const supplierId = currentUser.value.uid;
    return await addSupplierSubcollectionItem(supplierId, "catalog", data);
  }

  // Remove an item from the supplier's subcollection
  async function removeSupplierSubcollectionItem(supplierId, subCollectionName, itemId) {
    if (!supplierId || !subCollectionName || !itemId) {
      throw new Error("[removeSupplierSubcollectionItem] Missing required parameters.");
    }

    try {
      const itemRef = doc(db, `suppliers/${supplierId}/${subCollectionName}`, itemId);
      await deleteDoc(itemRef);
      console.log(`[removeSupplierSubcollectionItem] Removed item ${itemId} from ${subCollectionName} for supplier ${supplierId}.`);
    } catch (error) {
      console.error("[removeSupplierSubcollectionItem] Error removing subcollection item:", error.message);
      throw error;
    }
  }

  // Fetch a supplier's subcollection as a one-time snapshot (e.g., catalog)
  async function fetchSupplierSubcollectionOnce(supplierId, subCollectionName) {
    if (!supplierId || !subCollectionName) {
      throw new Error("[fetchSupplierSubcollectionOnce] Missing required parameters.");
    }

    try {
      const subcollectionRef = collection(
        db,
        `suppliers/${supplierId}/${subCollectionName}`
      );
      const snapshot = await getDocs(subcollectionRef);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`[fetchSupplierSubcollectionOnce] Fetched ${data.length} items from ${subCollectionName} for supplier ${supplierId}.`);
      return data;
    } catch (error) {
      console.error("[fetchSupplierSubcollectionOnce] Error fetching subcollection:", error.message);
      throw error;
    }
  }

  return {
    fetchSupplierSubCollection,
    addSupplierSubcollectionItem,
    addIngredientToSupplier,
    removeSupplierSubcollectionItem, // Added functionality
    fetchSupplierSubcollectionOnce,
  };
}
