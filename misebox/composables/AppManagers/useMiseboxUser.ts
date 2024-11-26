// composables/useMiseboxUser.js
import { computed } from 'vue';
import { useDocument, useFirestore } from 'vuefire';
import { doc, updateDoc, arrayUnion, setDoc, Timestamp } from 'firebase/firestore';

export const useMiseboxUser = (currentUser) => {
  const db = useFirestore();

  // Function to fetch the current user's document reactively
  const userDocRef = computed(() => {
    return currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null;
  });

  const { data: miseboxUser } = useDocument(userDocRef);

  // Function to create a new Misebox user and profile
  const createMiseboxUser = async (currentUser) => {
    const userRef = doc(db, 'misebox-users', currentUser.uid);

    const userData = {
      id: currentUser.uid,
      display_name: currentUser.displayName || "",
      email: currentUser.email || "",
      avatar: currentUser.photoURL || "", 
      handle: currentUser.email ? currentUser.email.split('@')[0] : `user_${currentUser.uid}`,
      mise_code: `MISO${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      user_apps: ['misebox-users'] // Initialize with the 'misebox-users' app
    };

    try {
      // Set the user document in Firestore
      await setDoc(userRef, userData);
      console.log('[createMiseboxUser] User document created successfully:', currentUser.uid);

      // Add the app to the user's `user_apps` array
      await addAppToUser(currentUser.uid, 'misebox-users');
    } catch (error) {
      console.error('[createMiseboxUser] Error creating user:', error);
    }
  };

  // Function to add an app to the user's `user_apps` array after confirmation
  const addAppToUser = async (userId, app) => {
    const userRef = doc(db, 'misebox-users', userId);
    try {
      await updateDoc(userRef, {
        user_apps: arrayUnion(app),
      });
      console.log(`[addAppToUser] App "${app}" added to user_apps for user:`, userId);
    } catch (error) {
      console.error('[addAppToUser] Error adding app to user_apps:', error);
    }
  };

  return {
    createMiseboxUser,
    miseboxUser, // Make this reactive and accessible
  };
};
