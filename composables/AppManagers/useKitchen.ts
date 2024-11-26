import { useFirestore } from 'vuefire';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useCurrentUser } from 'vuefire';

export function useKitchen() {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();
  const kitchensCollectionRef = collection(firestore, 'kitchens');
  const storage = getStorage();

  // Utility: Generate a searchable phrase
  const generateSearchPhrase = (place_name, formatted_address) => {
    const normalize = (str) => str.toLowerCase().replace(/'/g, '');
    return `${normalize(place_name)} ${normalize(formatted_address)}`;
  };

  // Utility: Upload image to Firebase Storage
  const uploadImageToStorage = async (photoUrl, fileName) => {
    try {
      console.log(`[uploadImageToStorage] Fetching image from URL: ${photoUrl}`);
      const response = await fetch(photoUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

      const blob = await response.blob();
      const imageRef = storageRef(storage, `kitchen_images/${fileName}`);
      await uploadBytes(imageRef, blob);
      const downloadUrl = await getDownloadURL(imageRef);

      console.log(`[uploadImageToStorage] Image uploaded successfully: ${downloadUrl}`);
      return downloadUrl;
    } catch (error) {
      console.error('[uploadImageToStorage] Error:', error);
      return null;
    }
  };

  // Create a new kitchen
  const createKitchen = async (kitchen) => {
    if (!currentUser.value) {
      alert('You must be logged in to create a kitchen.');
      return null;
    }

    try {
      const photoUrl = kitchen.photo_url
        ? await uploadImageToStorage(kitchen.photo_url, `${kitchen.place_id}.jpg`)
        : null;

      const kitchenDocRef = doc(kitchensCollectionRef, kitchen.place_id);
      const kitchenData = {
        ...kitchen,
        photo_url: photoUrl || kitchen.photo_url,
        added_by: currentUser.value.uid,
        team: [currentUser.value.uid],
        search_phrase: generateSearchPhrase(kitchen.place_name, kitchen.formatted_address),
      };

      console.log('[createKitchen] Adding kitchen to Firestore:', kitchenData);

      await setDoc(kitchenDocRef, kitchenData);
      return kitchen.place_id;
    } catch (error) {
      console.error('[createKitchen] Error:', error);
      alert('Failed to create kitchen. Please try again.');
      return null;
    }
  };

  // Delete an existing kitchen
  const deleteKitchen = async (kitchen) => {
    if (!currentUser.value) {
      alert('You must be logged in to delete a kitchen.');
      return;
    }

    if (kitchen.added_by !== currentUser.value.uid) {
      alert('Only the creator can delete this kitchen.');
      return;
    }

    try {
      console.log(`[deleteKitchen] Deleting kitchen: ${kitchen.place_name}`);
      const kitchenDocRef = doc(kitchensCollectionRef, kitchen.place_id);
      await deleteDoc(kitchenDocRef);

      alert('Kitchen deleted successfully!');
    } catch (error) {
      console.error('[deleteKitchen] Error:', error);
      alert('Failed to delete kitchen. Please try again.');
    }
  };

  return {
    createKitchen,
    deleteKitchen,
  };
}
