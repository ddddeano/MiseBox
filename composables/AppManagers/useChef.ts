import { computed } from 'vue';
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useChef = (miseboxUser) => {
  const db = useFirestore();

  const chefDocRef = computed(() => {
    return miseboxUser.value ? doc(db, 'chefs', miseboxUser.value.id) : null;
  });

  const { data: chef } = useDocument(chefDocRef);

  const createChef = async (favoriteRecipe) => {  // Collect favorite recipe during creation
    if (!miseboxUser.value) {
      console.error('Misebox user data is missing');
      return;
    }

    const chefRef = doc(db, 'chefs', miseboxUser.value.id);
    const userRef = doc(db, 'misebox-users', miseboxUser.value.id);

    const chefData = {
      id: miseboxUser.value.id,
      favoriteRecipe: favoriteRecipe || "",  // Collect the favorite recipe or set an empty string
    };

    try {
      const chefDoc = await getDoc(chefRef);
      if (!chefDoc.exists()) {
        await setDoc(chefRef, chefData);  // Create chef profile if it doesn't exist
      }

      // Add 'chef' to the user_apps array
      await updateDoc(userRef, {
        user_apps: arrayUnion('chefs')
      });

      console.log('Chef profile created successfully.');
    } catch (error) {
      console.error('Error during chef profile creation:', error);
    }
  };

  return {
    createChef,
    chef,
  };
};
