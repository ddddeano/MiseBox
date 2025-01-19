// composables/EntityManagers/supplier/supplierUpdate.js
import { useCurrentUser } from "vuefire";

export function useSupplierUpdate() {
  const { updateEntity } = useMiseboxFirestore();
  const currentUser = useCurrentUser();

  const updateSupplier = async (updates) => {
    try {
      const supplierId = currentUser.value?.uid;
      if (!supplierId) throw new Error("[updateSupplier] No authenticated user found.");

      // Update the supplier document
      await updateEntity("suppliers", supplierId, updates);

      console.log("[updateSupplier] Supplier profile updated successfully:", updates);
    } catch (error) {
      console.error("[updateSupplier] Error updating supplier profile:", error.message);
      throw error;
    }
  };

  return { updateSupplier };
}
