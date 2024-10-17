// server/api/chef/index.post.js
import { firestore, Timestamp } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { userId, data } = await readBody(event);

  if (!userId || !data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' });
  }

  const chefRef = firestore.doc(`chefs/${userId}`);
  const chefProfileRef = firestore.doc(`chef-profiles/${userId}`);

  const chefData = {
    ...data.chef,
    subscription: "",
    kitchens: [],
    recipes: []
  };

  const chefProfileData = {
    ...data.chefProfile,
    chef_account_created: Timestamp.now(),
  };

  // Check if the chef document exists, create it if it does not
  const chefDoc = await chefRef.get();
  if (!chefDoc.exists) {
    await chefRef.set(chefData);
  }

  // Check if the chef profile document exists, create it if it does not
  const chefProfileDoc = await chefProfileRef.get();
  if (!chefProfileDoc.exists) {
    await chefProfileRef.set(chefProfileData);
  }

  // Add the "chef" app to the user's `user_apps` array in Firestore
  await addAppToUser(userId, 'chefs');

  // Fetch the newly created or updated data
  const fetchedChefData = (await chefRef.get()).data();
  const fetchedChefProfileData = (await chefProfileRef.get()).data();

  return {
    status: 'success',
    userId,
    rootData: fetchedChefData,
    profileData: fetchedChefProfileData
  };
});
