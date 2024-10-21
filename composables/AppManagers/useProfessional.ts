import { computed } from 'vue';
import { useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore'; // Import Firestore `doc`

export const useProfessional = (miseboxUser) => {
  const db = useFirestore();

  // Function to fetch the current user's Professional document reactively
  const professionalDocRef = computed(() => {
    return miseboxUser.value ? doc(db, 'professionals', miseboxUser.value.id) : null;
  });

  const { data: professional } = useDocument(professionalDocRef); // Reactive professional document

  const createProfessional = async () => {
    // Ensure miseboxUser is passed correctly and exists
    if (!miseboxUser || !miseboxUser.value) {
      console.error('Misebox user data is missing');
      return;
    }

    const payload = {
      professional: {
        id: miseboxUser.value.id,
        mise_code: miseboxUser.value.mise_code,
        handle: miseboxUser.value.handle,
        avatar: miseboxUser.value.avatar,
        display_name: miseboxUser.value.display_name,
      },
      professionalProfile: {
        // Add additional professional profile data here if necessary
      },
    };

    try {
      const response = await fetch('/api/professional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: miseboxUser.value.id, data: payload }),
      });

      if (!response.ok) {
        throw new Error('Failed to create professional profile');
      }

      console.log('Professional profile created successfully.');
    } catch (error) {
      console.error('Error during professional profile creation:', error);
    }
  };

  return {
    createProfessional,
    professional, // Return the professional document reactively if needed
  };
};
