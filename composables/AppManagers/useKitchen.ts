import { useFirestore } from "vuefire";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useCurrentUser } from "vuefire";

export function useKitchen() {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();
  const kitchensCollectionRef = collection(firestore, "kitchens");
  const { currentUserMini } = useMiseboxUser();

  // Utility: Generate a searchable phrase
  const generateSearchPhrase = (place_name, formatted_address) => {
    const normalize = (str) => str.toLowerCase().replace(/'/g, "");
    return `${normalize(place_name)} ${normalize(formatted_address)}`;
  };

  const createKitchen = async (selectedKitchen) => {
    console.log("[createKitchen] Received selectedKitchen object:", selectedKitchen);

    if (!currentUser.value || !currentUserMini.value) {
      alert("You must be logged in to create a kitchen.");
      return null;
    }

    try {
      let avatarUrls = { avatarUrl: null, miniAvatarUrl: null };

      if (selectedKitchen.photo_url) {
        console.log("[createKitchen] Fetching and processing photo_url for avatar.");
        avatarUrls = await processAndUploadAvatar(selectedKitchen.photo_url, selectedKitchen.place_id);
      }

      // Prepare the kitchen object for Firestore
      const newKitchenData = {
        google_places_id: selectedKitchen.place_id || "",
        place_name: selectedKitchen.place_name || "",
        formatted_address: selectedKitchen.formatted_address || "",
        city: selectedKitchen.city || "",
        region: selectedKitchen.region || "",
        country: selectedKitchen.country || "",
        avatar: avatarUrls.avatarUrl || "failed",
        avatar_mini: avatarUrls.miniAvatarUrl || "failed",
        added_by: currentUser.value.uid,
        team: [currentUserMini.value],
        search_phrase: generateSearchPhrase(
          selectedKitchen.place_name || "",
          selectedKitchen.formatted_address || ""
        ),
        created_at: new Date().toISOString(),
      };

      console.log("[createKitchen] Saving new kitchen data:", newKitchenData);

      // Save to Firestore and get the auto-generated ID
      const kitchenDocRef = await addDoc(kitchensCollectionRef, newKitchenData);
      const kitchenId = kitchenDocRef.id;

      console.log("[createKitchen] Kitchen created successfully with ID:", kitchenId);

      // Add the Firestore ID to the newly created document
      await updateDoc(kitchenDocRef, { kitchenId });

      console.log("[createKitchen] Added Firestore ID to kitchen document.");

      // Update the chef's kitchens array in Firestore
      const chefDocRef = doc(firestore, "chefs", currentUser.value.uid);
      await updateDoc(chefDocRef, {
        kitchens: arrayUnion({
          kitchenId,
          place_name: selectedKitchen.place_name || "",
          avatar_mini: avatarUrls.miniAvatarUrl || "failed",
        }),
      });

      console.log("[createKitchen] Added kitchen ID to chef's profile.");

      return kitchenId;
    } catch (error) {
      console.error("[createKitchen] Error creating kitchen:", error);
      alert("Failed to create kitchen. Please try again.");
      return null;
    }
  };

  return {
    createKitchen,
  };
}
