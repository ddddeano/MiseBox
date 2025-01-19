// composables/EntityManagers/miseboxUser/miseboxUserCreate.js
import { arrayUnion } from 'firebase/firestore';
import { useCurrentUser } from 'vuefire';

export function useMiseboxUserCreate() {
  const currentUser = useCurrentUser();
  const { createEntity } = useMiseboxFirestore(); // Helper for entities like MiseboxUser

  const createMiseboxUser = async (newMiseboxUser) => {
    try {
      if (!newMiseboxUser || typeof newMiseboxUser !== "object") {
        throw new Error("[createMiseboxUser] Invalid input. Must be an object.");
      }

      // Generate or use existing Mise Code
      const miseCode = newMiseboxUser.mise_code || currentUser.value?.mise_code || generateMiseCode();

      // Fallback for email
      const email = newMiseboxUser.email || currentUser.value?.email || "";

      // Fallback for display_name
      const displayName = newMiseboxUser.display_name || currentUser.value?.displayName || `User-${miseCode}`;

      // Prepare the Misebox User data
      const processedUser = {
        ...newMiseboxUser,
        mise_code: miseCode,
        email, // Use the resolved email
        display_name: displayName, // Use the resolved display name
        handle:
          newMiseboxUser.handle ||
          generateUserHandle(
            newMiseboxUser.email,
            displayName,
            miseCode
          ),
        ...(await processAvatarUpload(newMiseboxUser.photoURL)),
        user_apps: arrayUnion("misebox-users"),
      };

      // Save the user in Firestore with `createEntity`
      await createEntity("misebox-users", {
        ...processedUser,
      });

      console.log("[createMiseboxUser] Misebox User created successfully:", processedUser);
    } catch (error) {
      console.error("[createMiseboxUser] Error creating Misebox User:", error.message);
      throw error;
    }
  };

  return { createMiseboxUser };
}
