<!-- composables/kitchen/createKitchen.js -->
import { useFirestore, useCurrentUser } from "vuefire";
import { collection, addDoc, updateDoc } from "firebase/firestore";

export const createKitchen = async (selectedKitchen) => {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();
  const collectionName = "kitchens"; // Collection name

  console.log("[createKitchen] Received selectedKitchen object:", selectedKitchen);

  if (!currentUser.value) {
    console.error("[createKitchen] User not authenticated.");
    return null;
  }

  try {
    const newKitchenData = {
      google_places_id: selectedKitchen.place_id || "",
      name: selectedKitchen.place_name || "",
      formatted_address: selectedKitchen.formatted_address || "",
      city: selectedKitchen.city || "",
      region: selectedKitchen.region || "",
      country: selectedKitchen.country || "",
      added_by: currentUser.value.uid,
      created_at: new Date().toISOString(),
      source: "firestore",
    };

    const kitchensCollectionRef = collection(firestore, collectionName);
    const kitchenDocRef = await addDoc(kitchensCollectionRef, newKitchenData);

    const kitchenIdFromFirestore = kitchenDocRef.id;

    // Check if photo_url is available and use the proxy endpoint
    let avatarUrl = selectedKitchen.photo_url || "/assets/images/default-kitchen-avatar.jpg";
    if (selectedKitchen.photo_url) {
      avatarUrl = `/api/google-photo?photo_url=${encodeURIComponent(selectedKitchen.photo_url)}`;
    }

    const avatarMiniUrl = avatarUrl; // Using the same image for both avatar and mini-avatar

    const { avatarUrl: uploadedAvatarUrl, avatarMiniUrl: uploadedAvatarMiniUrl } = await uploadAvatarToStorage(
      avatarUrl,
      `kitchens/${kitchenIdFromFirestore}/avatar.jpg`,
      `kitchens/${kitchenIdFromFirestore}/avatar-mini.jpg`
    );

    await updateDoc(kitchenDocRef, {
      kitchenId: kitchenIdFromFirestore,
      avatar: uploadedAvatarUrl,
      avatar_mini: uploadedAvatarMiniUrl,
    });

    console.log("[createKitchen] Kitchen created successfully:", kitchenIdFromFirestore);
    return kitchenIdFromFirestore;
  } catch (error) {
    console.error("[createKitchen] Error creating kitchen:", error);
    return null;
  }
};
