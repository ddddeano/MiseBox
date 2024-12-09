import { computed, watch } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";
import { doc, setDoc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";

export const useMiseboxUser = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();

  if (!db) {
    console.error("[useMiseboxUser] Firestore instance not found");
    throw new Error("Firestore instance is required.");
  }

  // Reactive reference for current user's Misebox profile
  const currentMiseboxUserDocRef = computed(() =>
    currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
  );

  const { data: currentMiseboxUser } = useDocument(currentMiseboxUserDocRef);

  // Create a new Misebox user profile
  const createMiseboxUser = async () => {
    if (!currentUser.value) {
      console.error("[createMiseboxUser] User not authenticated.");
      return;
    }

    const { uid, displayName, email, photoURL } = currentUser.value;
    const userRef = doc(db, "misebox-users", uid);

    // Remove `@` from handle in the database, ensure it's clean
    const handle = email ? email.split("@")[0] : "user";

    const userData = {
      id: uid,
      display_name: displayName || "New User",
      handle, // Store clean handle without `@`
      mise_code: `MISO${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      avatar: photoURL || "",
      user_apps: ["misebox-users"],
    };

    try {
      await setDoc(userRef, userData);
      console.log("[createMiseboxUser] User document created successfully:", uid);
    } catch (error) {
      console.error("[createMiseboxUser] Error creating user document:", error);
    }
  };

  // Delete the current Misebox user profile
  const deleteMiseboxUser = async () => {
    if (!currentUser.value) {
      console.error("[deleteMiseboxUser] User not authenticated.");
      return;
    }

    const { uid } = currentUser.value;
    const userRef = doc(db, "misebox-users", uid);

    try {
      await deleteDoc(userRef);

      // Remove "misebox-users" from the user's apps in the `misebox-users` collection
      const miseboxUserRef = doc(db, "misebox-users", uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove("misebox-users"),
      });

      console.log("[deleteMiseboxUser] Misebox user profile deleted successfully.");
    } catch (error) {
      console.error("[deleteMiseboxUser] Error deleting Misebox user profile:", error);
    }
  };

  // Computed property to derive mini user from currentMiseboxUser
  const currentUserMini = computed(() => {
    if (!currentMiseboxUser.value) return null;

    const { id, display_name, avatar } = currentMiseboxUser.value;

    const miniUser = {
      id: id || "",
      display_name: display_name || "Unknown User",
      avatar: avatar || "/images/default-avatar.png",
    };

    console.log("[currentUserMini] Derived mini user:", miniUser);
    return miniUser;
  });

  // Clear the current Misebox user state
  const clearMiseboxUser = () => {
    currentMiseboxUser.value = null;
  };

  // Watch the currentUser for changes and clear the currentMiseboxUser if logged out
  watch(currentUser, (newUser) => {
    if (!newUser) {
      clearMiseboxUser();
    }
  });

  return {
    currentMiseboxUser: computed(() => currentMiseboxUser?.value || null),
    currentUserMini, // Expose the mini user as a computed property
    createMiseboxUser,
    deleteMiseboxUser,
    clearMiseboxUser,
  };
};
