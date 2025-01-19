// composables/EntityManagers/miseboxUser/miseboxUserUtils.js
import { useCurrentUser } from "vuefire";


export const generateUserHandle = (email, displayName, misecode) => {
  try {
    if (email) {
      const handle = email.split("@")[0];
      console.log(`[generateUserHandle] Generated handle from email: ${handle}`);
      return handle;
    }
    if (displayName) {
      const handle = displayName.replace(/\s+/g, "-").toLowerCase();
      console.log(`[generateUserHandle] Generated handle from displayName: ${handle}`);
      return handle;
    }
    throw new Error("[generateUserHandle] Missing email and displayName for handle generation.");
  } catch (error) {
    console.error("[generateUserHandle] Error:", error.message);
    throw error;
  }
};

/**
 * Generates a unique Mise Code.
 * @returns {string} - Generated Mise Code.
 */
export const generateMiseCode = () => {
  const miseCode = `MISO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  console.log(`[generateMiseCode] Generated Mise Code: ${miseCode}`);
  return miseCode;
};

/**
 * Processes avatar upload using the current user's ID.
 * @param {string} [photoURL] - URL of the photo to upload.
 * @returns {Promise<Object>} - Processed avatar data.
 */
export const processAvatarUpload = async (photoURL) => {
  const currentUser = useCurrentUser();

  try {
    const uid = currentUser.value?.uid;
    if (!uid) {
      throw new Error("[processAvatarUpload] No authenticated user found.");
    }

    const avatarSourceUrl = photoURL || new URL("@/assets/images/default-avatar.jpg", import.meta.url).href;
    const avatarBlob = await fetch(avatarSourceUrl).then((res) => res.blob());

    const avatarData = await handleAvatarUpload(
      avatarBlob,
      `misebox-users/${uid}/avatar.jpg`,
      `misebox-users/${uid}/avatar-mini.jpg`
    );

    console.log("[processAvatarUpload] Avatar processed successfully:", avatarData);
    return avatarData;
  } catch (error) {
    console.error("[processAvatarUpload] Error processing avatar:", error.message);
    throw error;
  }
};
