<!-- composables/kitchen/useKitchen.js -->
/**
 * useKitchen.js
 * 
 * Composable that provides Firestore operations for Kitchen entities:
 *  - createKitchen(selectedKitchen)
 *  - deleteKitchen(kitchen)
 *  - addUserToKitchenTeam(kitchenId, userId)
 * NO IMPORTS NEEDED AS AUTO IS SET
 */

/**
 * Returns an object with kitchen-related Firestore operations.
 * 
 * @returns {Object} 
 * @property {Function} createKitchen - Creates a new kitchen from a selectedKitchen object
 *   (e.g., from Google Places or user input).
 * @property {Function} deleteKitchen - Deletes a given kitchen document if the current user is authorized.
 * @property {Function} addUserToKitchenTeam - Adds a user (by userId) to the kitchen team array. 
 *   The avatar is automatically fetched from `misebox-users`.
 * 
 * @example
 * // Import and destructure the functions you need:
 * import { useKitchen } from "@/composables/kitchen/useKitchen";
 * 
 * const { createKitchen, deleteKitchen, addUserToKitchenTeam } = useKitchen();
 * 
 * // 1. Creating a kitchen:
 * const selectedKitchen = {
 *   place_id: "ChIJi41IIMCxe0gReAxoM7RzW2c",
 *   place_name: "Happy Lemon",
 *   formatted_address: "84 Portland St, Manchester M1 4GX, United Kingdom",
 *   city: "Manchester",
 *   region: "Greater Manchester",
 *   country: "United Kingdom",
 *   photo_url: "https://maps.google.com/...",
 *   source: "google"
 * };
 * const newKitchenId = await createKitchen(selectedKitchen);
 * 
 * // 2. Deleting a kitchen:
 * const kitchenToDelete = { kitchenId: newKitchenId, added_by: currentUser.uid };
 * await deleteKitchen(kitchenToDelete);
 * 
 * // 3. Adding a user to the kitchen's team:
 * // The user's avatar is fetched from the `misebox-users/{userId}` doc.
 * await addUserToKitchenTeam("someKitchenId", "someUserId");
 */



export function useKitchen() {
  return {
    createKitchen,
    deleteKitchen,
    addUserToKitchenTeam, // (kitchenId, userId)
  };
}
