// composables/ObjectManagers/kitchen/kitchenUtils.js
// ============================
// composables/ObjectManagers/kitchen/kitchenUtils.js
// ============================

/**
 * Process a Google photo URL for kitchen avatars.
 * @param {string} photoUrl - The Google photo URL.
 * @returns {Promise<string>} - Processed Firebase photo URL.
 */
export async function processGooglePhoto(photoUrl) {
  if (!photoUrl) {
    throw new Error("[processGooglePhoto] No photo URL provided.");
  }

  try {
    const response = await $fetch("/api/google-photo", {
      params: { photo_url: photoUrl },
    });
    return response.firebaseUrl; // Return the processed URL
  } catch (error) {
    console.error("[processGooglePhoto] Error processing photo:", error.message);
    throw error;
  }
}
