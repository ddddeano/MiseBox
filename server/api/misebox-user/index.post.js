import { firestore, Timestamp } from '../../utils/firebase';
import { generateMiseCode, generateHandle } from '../../utils/utilityFunctions';

export default defineEventHandler(async (event) => {
  try {
    // Read body data from the event
    const { userId, data } = await readBody(event);

    if (!userId || !data) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid input data' });
    }

    // Firestore references
    const userRef = firestore.doc(`misebox-users/${userId}`);
    const userProfileRef = firestore.doc(`misebox-user-profiles/${userId}`);

    // Prepare user and profile data
    const userData = {
      ...data.miseboxUser,
      mise_code: await generateMiseCode(),
      handle: await generateHandle(data.miseboxUser.email),
    };

    const userProfileData = {
      ...data.miseboxUserProfile,
      account_created: Timestamp.now(),
      social_media: {
        misebox: `misebox-users/${userId}`,
      },
    };

    // Fetch user and profile data
    const [userDoc, userProfileDoc] = await Promise.all([userRef.get(), userProfileRef.get()]);

    // Set user data if it doesn't exist
    if (!userDoc.exists) {
      await userRef.set(userData);
    }

    // Set profile data if it doesn't exist
    if (!userProfileDoc.exists) {
      await userProfileRef.set(userProfileData);
    }

    // Call additional functions if needed (like adding the app to the user)
    await addAppToUser(userId, 'misebox-user');

    // Fetch final user and profile data
    const [fetchedUserData, fetchedUserProfileData] = await Promise.all([
      userRef.get().then(doc => doc.data()),
      userProfileRef.get().then(doc => doc.data()),
    ]);

    // Return success response
    return {
      status: 'success',
      userId,
      rootData: fetchedUserData,
      profileData: fetchedUserProfileData,
    };
  } catch (error) {
    console.error('[misebox-user API] Error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
