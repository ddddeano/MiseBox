import { computed } from 'vue';
import { useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore'; // Import Firestore `doc`

export const useChef = (miseboxUser) => {
  const db = useFirestore();

  // Function to fetch the current user's Chef document reactively
  const chefDocRef = computed(() => {
    return miseboxUser.value ? doc(db, 'chefs', miseboxUser.value.id) : null;
  });

  const { data: chef } = useDocument(chefDocRef); // Reactive chef document

  const createChef = async () => {
    // Ensure miseboxUser is passed correctly and exists
    if (!miseboxUser || !miseboxUser.value) {
      console.error('Misebox user data is missing');
      return;
    }

    const payload = {
      chef: {
        id: miseboxUser.value.id,
        mise_code: miseboxUser.value.mise_code,
        handle: miseboxUser.value.handle,
        avatar: miseboxUser.value.avatar,
        display_name: miseboxUser.value.display_name,
      },
      chefProfile: {
        // Add additional chef profile data here if necessary
      },
    };

    try {
      const response = await fetch('/api/chef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: miseboxUser.value.id, data: payload }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chef profile');
      }

      console.log('Chef profile created successfully.');
    } catch (error) {
      console.error('Error during chef profile creation:', error);
    }
  };

  return {
    createChef,
    chef, // Return the chef document reactively if needed
  };
};
