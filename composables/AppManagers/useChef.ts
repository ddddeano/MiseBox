import { computed } from 'vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { useMiseboxUser } from './useMiseboxUser';

export const useChef = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const { currentMiseboxUser, createMiseboxUser } = useMiseboxUser();

  // Get the current user's Chef profile
  const currentChefDocRef = computed(() =>
    currentUser.value ? doc(db, 'chefs', currentUser.value.uid) : null
  );
  const { data: currentChef } = useDocument(currentChefDocRef);

  // Create a new Chef profile
  const createChef = async () => {
    if (!currentUser.value) {
      console.error('User not authenticated.');
      return;
    }

    if (!currentMiseboxUser) {
      console.log('Misebox user not found, creating one...');
      await createMiseboxUser();
    }

    const { uid } = currentUser.value;
    const chefRef = doc(db, 'chefs', uid);
    const chefData = {
      id: uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(chefRef, chefData);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion('chefs'),
      });

      console.log('Chef profile created successfully.');
    } catch (error) {
      console.error('Error creating Chef profile:', error);
    }
  };

  // Delete the current Chef profile
  const deleteChef = async () => {
    if (!currentUser.value) {
      console.error('User not authenticated.');
      return;
    }

    const { uid } = currentUser.value;
    const chefRef = doc(db, 'chefs', uid);

    try {
      await deleteDoc(chefRef);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove('chefs'),
      });

      console.log('Chef profile deleted successfully.');
    } catch (error) {
      console.error('Error deleting Chef profile:', error);
    }
  };

  return {
    currentChef: computed(() => currentChef?.value || null),
    createChef,
    deleteChef,
  };
};
