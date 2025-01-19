// composables/EntityManagers/supplier/supplierDelete.js
import { useCurrentUser } from "vuefire";

export function useSupplierDelete() {
  const { deleteEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const deleteSupplier = async () => {
    try {
      const supplierId = currentUser.value?.uid;
      if (!supplierId) throw new Error("[deleteSupplier] No authenticated user found.");

      // Delete the supplier document
      await deleteEntity("suppliers", supplierId);

      console.log("[deleteSupplier] Supplier profile deleted successfully.");
    } catch (error) {
      console.error("[deleteSupplier] Error deleting supplier profile:", error.message);
      throw error;
    }
  };

  return { deleteSupplier };
}
