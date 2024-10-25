import { computed } from 'vue';
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useProfessional = (miseboxUser) => {
  const db = useFirestore();

  const professionalDocRef = computed(() => {
    return miseboxUser.value ? doc(db, 'professionals', miseboxUser.value.id) : null;
  });

  const { data: professional } = useDocument(professionalDocRef);

  const createProfessional = async (isLookingForWork) => {  // Collect work status during creation
    if (!miseboxUser.value) {
      console.error('Misebox user data is missing');
      return;
    }

    const professionalRef = doc(db, 'professionals', miseboxUser.value.id);
    const userRef = doc(db, 'misebox-users', miseboxUser.value.id);

    const professionalData = {
      id: miseboxUser.value.id,
      isLookingForWork: !!isLookingForWork,  // Store the boolean value
    };

    try {
      const professionalDoc = await getDoc(professionalRef);
      if (!professionalDoc.exists()) {
        await setDoc(professionalRef, professionalData);  // Create professional profile if it doesn't exist
      }

      // Add 'professional' to the user_apps array
      await updateDoc(userRef, {
        user_apps: arrayUnion('professionals')
      });

      console.log('Professional profile created successfully.');
    } catch (error) {
      console.error('Error during professional profile creation:', error);
    }
  };

  return {
    createProfessional,
    professional,
  };
};
