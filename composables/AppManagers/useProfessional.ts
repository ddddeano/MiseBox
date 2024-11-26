import { computed } from 'vue';
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { useMiseboxUser } from './useMiseboxUser';

export const useProfessional = () => {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const { currentMiseboxUser, createMiseboxUser } = useMiseboxUser();

  // Get the current user's Professional profile
  const currentProfessionalDocRef = computed(() =>
    currentUser.value ? doc(db, 'professionals', currentUser.value.uid) : null
  );
  const { data: currentProfessional } = useDocument(currentProfessionalDocRef);

  // Create a new Professional profile
  const createProfessional = async () => {
    if (!currentUser.value) {
      console.error('User not authenticated.');
      return;
    }

    if (!currentMiseboxUser) {
      console.log('Misebox user not found, creating one...');
      await createMiseboxUser();
    }

    const { uid } = currentUser.value;
    const professionalRef = doc(db, 'professionals', uid);
    const professionalData = {
      id: uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(professionalRef, professionalData);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayUnion('professionals'),
      });

      console.log('Professional profile created successfully.');
    } catch (error) {
      console.error('Error creating Professional profile:', error);
    }
  };

  // Delete the current Professional profile
  const deleteProfessional = async () => {
    if (!currentUser.value) {
      console.error('User not authenticated.');
      return;
    }

    const { uid } = currentUser.value;
    const professionalRef = doc(db, 'professionals', uid);

    try {
      await deleteDoc(professionalRef);

      const miseboxUserRef = doc(db, 'misebox-users', uid);
      await updateDoc(miseboxUserRef, {
        user_apps: arrayRemove('professionals'),
      });

      console.log('Professional profile deleted successfully.');
    } catch (error) {
      console.error('Error deleting Professional profile:', error);
    }
  };

  return {
    currentProfessional: computed(() => currentProfessional?.value || null),
    createProfessional,
    deleteProfessional,
  };
};
