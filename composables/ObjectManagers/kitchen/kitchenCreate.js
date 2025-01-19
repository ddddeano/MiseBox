// composables/ObjectManagers/kitchen/kitchenCreate.js
// ============================
// composables/ObjectManagers/kitchen/kitchenCreate.js
// ============================


export function useKitchenCreate() {
  const { createObject } = useMiseboxFirestore();

  const createKitchen = async (newKitchen) => {
    try {
      if (!newKitchen || typeof newKitchen !== "object") {
        throw new Error("[createKitchen] Invalid input. Must be an object.");
      }

      if (!newKitchen.name || !newKitchen.formatted_address) {
        throw new Error("[createKitchen] Missing required fields: name, formatted_address.");
      }

      let photoUrl = null;

      // Handle Google photo processing if applicable
      if (newKitchen.source === "google" && newKitchen.photo_url) {
        photoUrl = await processGooglePhoto(newKitchen.photo_url);
      }

      // Prepare normalized kitchen data
      const normalizedKitchen = {
        ...newKitchen,
        formatted_address: `${newKitchen.name}, ${newKitchen.formatted_address}`, // Ensure address is formatted
        source: "firestore", // Default source
        ...(newKitchen.source === "google" && { place_id: newKitchen.place_id }), // Include place_id if from Google
        ...(photoUrl && { avatar: photoUrl }), // Include avatar if processed
      };

      // Save the kitchen in Firestore
      const kitchenId = await createObject("kitchens", normalizedKitchen);
      console.log("[createKitchen] Kitchen created successfully:", normalizedKitchen);

      return kitchenId; // Return the Firestore ID for routing or further use
    } catch (error) {
      console.error("[createKitchen] Error creating kitchen:", error.message);
      throw error;
    }
  };

  return { createKitchen };
}
