// composables/useProfessional.js
export const useProfessional = () => {
  const createProfessional = async (miseboxUser) => {
    const payload = {
      professional: {
        id: miseboxUser.id,
        mise_code: miseboxUser.mise_code,
        handle: miseboxUser.handle,
        avatar: miseboxUser.avatar,
        display_name: miseboxUser.display_name,
      },
      professionalProfile: {
        // Additional profile data can be added here
      },
    };

    try {
      const response = await fetch('/api/professional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: miseboxUser.id, data: payload }),
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
  };
};
