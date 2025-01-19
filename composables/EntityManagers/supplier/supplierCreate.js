// composables/EntityManagers/supplier/supplierCreate.js
import { processGooglePhoto } from "./supplierUtils";
import { arrayUnion, } from 'firebase/firestore';

export function useSupplierCreate() {
  const { createEntity, updateEntity } = useMiseboxFirestore();

  const createSupplier = async (newSupplier, isClaimed = false) => {
    if (!newSupplier || typeof newSupplier !== "object") {
      throw new Error("[createSupplier] Invalid input. Must be an object.");
    }

    try {
      let photoUrl = null;

      // Process photo if the supplier is from Google
      if (newSupplier.source === "google" && newSupplier.photo_url) {
        photoUrl = await processGooglePhoto(newSupplier.photo_url);
      }

      // Normalize supplier data directly in create
      const normalizedSupplier = {
        name: newSupplier.name || newSupplier.place_name,
        formatted_address: `${newSupplier.name || newSupplier.place_name}, ${
          newSupplier.formatted_address || ""
        }`.trim(),
        source: "firestore",
        claimed: isClaimed,
        ...(newSupplier.source === "google" && { place_id: newSupplier.place_id }),
        ...(photoUrl && { avatar: photoUrl }),
      };

      // Save the supplier in Firestore
      const createdSupplier = await createEntity("suppliers", normalizedSupplier);

      // Update the current user's `user_apps` field
      await updateEntity("misebox-users", {
        user_apps: arrayUnion("suppliers"),
      });

      console.log("[createSupplier] Supplier profile created successfully:", createdSupplier);

      return createdSupplier;
    } catch (error) {
      console.error("[createSupplier] Error creating supplier:", error);
      throw error;
    }
  };

  return { createSupplier };
}
