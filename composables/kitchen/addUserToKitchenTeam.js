<!-- composables/kitchen/addUserToKitchenTeam.js -->
import { useFirestore, useCurrentUser } from "vuefire";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

/**
 * addUserToKitchenTeam
 * 
 * Fetches the user's avatar from the `misebox-users` collection (based on userId),
 * then adds the user to the 'team' array in the `kitchens` collection doc.
 *
 * @async
 * @function addUserToKitchenTeam
 * @param {string} kitchenId - The Firestore document ID of the kitchen to update.
 * @param {string} userId - The UID of the user to add to the team.
 * 
 * @example
 * // Example usage in a Vue component:
 * import { useKitchen } from "@/composables/kitchen/useKitchen";
 * 
 * const { addUserToKitchenTeam } = useKitchen();
 * await addUserToKitchenTeam("kitchen123", "user456");
 */
export const addUserToKitchenTeam = async (kitchenId, userId) => {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();

  // Ensure the current user is authenticated before proceeding
  if (!currentUser.value) {
    console.error("[addUserToKitchenTeam] User not authenticated.");
    return;
  }

  try {
    // Fetch the user's doc from 'misebox-users' to get the avatar
    const miseboxUserDocRef = doc(firestore, "misebox-users", userId);
    const snapshot = await getDoc(miseboxUserDocRef);

    let userAvatar = "/assets/images/default-avatar.jpg";
    if (snapshot.exists()) {
      const userData = snapshot.data();
      userAvatar = userData.avatar || userAvatar;
    }

    // Now update the kitchen doc
    const kitchenDocRef = doc(firestore, "kitchens", kitchenId);
    const teamMember = {
      id: userId,
      avatar: userAvatar,
    };

    await updateDoc(kitchenDocRef, {
      team: arrayUnion(teamMember),
    });

    console.log("[addUserToKitchenTeam] User added to the kitchen team successfully.");
  } catch (error) {
    console.error("[addUserToKitchenTeam] Error adding user to the kitchen team:", error);
  }
};
