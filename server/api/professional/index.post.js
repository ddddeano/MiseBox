import { firestore, Timestamp } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { userId, data } = await readBody(event);

  if (!userId || !data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input data' });
  }

  const professionalRef = firestore.doc(`professionals/${userId}`);
  const professionalProfileRef = firestore.doc(`professional-profiles/${userId}`);

  const professionalData = {
    ...data.professional,
  };
  const professionalProfileData = {
    ...data.professionalProfile,
    professional_account_created: Timestamp.now()
  };

  // Check if the professional document exists and set only if it does not exist
  const professionalDoc = await professionalRef.get();
  if (!professionalDoc.exists) {
    await professionalRef.set(professionalData);
  }

  // Check if the professional profile document exists and set only if it does not exist
  const professionalProfileDoc = await professionalProfileRef.get();
  if (!professionalProfileDoc.exists) {
    await professionalProfileRef.set(professionalProfileData);
  }

  // Presuming addAppToUser function should be called regardless
  await addAppToUser(userId, 'professionals');

  const fetchedProfessionalData = (await professionalRef.get()).data();
  const fetchedProfessionalProfileData = (await professionalProfileRef.get()).data();

  return {
    status: 'success',
    userId,
    rootData: fetchedProfessionalData,
    profileData: fetchedProfessionalProfileData
  };
});
