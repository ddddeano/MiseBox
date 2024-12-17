<!-- composables/utils/uploadAvatarToStorage.js -->
//uploadAvatarTotorage

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadAvatarToStorage = async (sourceUrl, avatarFilePath, avatarMiniFilePath) => {
  const storage = getStorage();

  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
      throw new Error(`[uploadAvatarToStorage] Failed to fetch avatar from URL: ${sourceUrl}`);
    }
    const blob = await response.blob();

    // Standard avatar
    const avatarRef = storageRef(storage, avatarFilePath);
    await uploadBytes(avatarRef, blob);
    const avatarUrl = await getDownloadURL(avatarRef);

    // Mini avatar
    const miniAvatarRef = storageRef(storage, avatarMiniFilePath);
    await uploadBytes(miniAvatarRef, blob);
    const avatarMiniUrl = await getDownloadURL(miniAvatarRef);

    return { avatarUrl, avatarMiniUrl };
  } catch (error) {
    console.error("[uploadAvatarToStorage] Error uploading avatar:", error);
    throw error;
  }
};
