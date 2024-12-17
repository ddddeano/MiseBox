import { computed, watch } from "vue";
import { useCurrentUser, useFirestore, useDocument } from "vuefire";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const useMiseboxUser = () => {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();
  const collectionName = "misebox-users"; // Centralized collection name

  const createMiseboxUser = async () => {
    if (!currentUser.value) {
      console.error("[createMiseboxUser] User not authenticated.");
      return;
    }

    const { uid, displayName, email, photoURL } = currentUser.value;
    const userRef = doc(firestore, collectionName, uid); // Document ID is set to Firebase UID

    // Generate user handle
    const handle = email ? email.split("@")[0] : "user";

    // Basic user data
    const userData = {
      id: uid,
      display_name: displayName || "New User",
      handle,
      mise_code: `MISO${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      user_apps: [collectionName],
      created_at: new Date().toISOString(),
    };

    try {
      // Create user document in Firestore with basic data
      await setDoc(userRef, userData);

      // Determine the source of the avatar
      const sourceUrl =
        photoURL && photoURL.trim() !== ""
          ? photoURL
          : new URL("@/assets/images/default-avatar.jpg", import.meta.url).href;

      // Paths for avatar files in storage
      const avatarFilePath = `misebox-users/${uid}/avatar.jpg`;
      const avatarMiniFilePath = `misebox-users/${uid}/avatar-mini.jpg`;

      // Upload the avatar and mini-avatar to storage
      const { avatarUrl, avatarMiniUrl } = await uploadAvatarToStorage(
        sourceUrl,
        avatarFilePath,
        avatarMiniFilePath
      );

      // Add extra fields (avatar, avatar_mini, mise_code, user_apps)
      const userAdditionalData = {
        avatar: avatarUrl,
        avatar_mini: avatarMiniUrl,
      };

      // Update user document with the additional fields
      await updateDoc(userRef, userAdditionalData);

      console.log("[createMiseboxUser] User document created successfully:", uid);
    } catch (error) {
      console.error("[createMiseboxUser] Error creating user document:", error);
    }
  };

  /**
   * Delete the current Misebox user profile from Firestore.
   */
  const deleteMiseboxUser = async () => {
    if (!currentUser.value) {
      console.error("[deleteMiseboxUser] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;

    try {
      await deleteDoc(doc(firestore, collectionName, uid));
      console.log("[deleteMiseboxUser] Misebox user profile deleted successfully.");
    } catch (error) {
      console.error("[deleteMiseboxUser] Error deleting Misebox user profile:", error);
    }
  };

  const currentMiseboxUserDocRef = computed(() =>
    currentUser.value ? doc(firestore, collectionName, currentUser.value.uid) : null
  );

  const { data: currentMiseboxUser } = useDocument(currentMiseboxUserDocRef);

  const currentUserMini = computed(() => {
    if (!currentMiseboxUser.value) return null;

    const { id, display_name } = currentMiseboxUser.value;

    return {
      id: id || "",
      display_name: display_name || "Unknown User",
    };
  });
  // Function to clear Misebox user state
  const clearMiseboxUser = () => {
    currentMiseboxUser.value = null;
  };

  // Watch for changes in currentUser to clear MiseboxUser data if user logs out
  watch(currentUser, (newUser) => {
    if (!newUser) {
      clearMiseboxUser();
    }
  });

  return {
    createMiseboxUser,
    deleteMiseboxUser,
    currentMiseboxUser: computed(() => currentMiseboxUser?.value || null),
    currentUserMini,
    clearMiseboxUser,
  };
};
