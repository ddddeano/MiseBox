
import { collection, doc,  setDoc, addDoc } from 'firebase/firestore'

export function useKitchen(currentUser) {
  const firestore = useFirestore();
  const kitchensCollectionRef = collection(firestore, 'kitchens');

  // Function to generate a search phrase with and without apostrophes
  const generateSearchPhrase = (place_name, formatted_address) => {
    const lowerCaseName = place_name.toLowerCase();
    const lowerCaseAddress = formatted_address.toLowerCase();
    const nameWithoutApostrophe = lowerCaseName.replace(/'/g, '');
    const addressWithoutApostrophe = lowerCaseAddress.replace(/'/g, '');
    
    return `${lowerCaseName} ${nameWithoutApostrophe} ${lowerCaseAddress} ${addressWithoutApostrophe}`;
  };

  const createKitchen = async (kitchen) => {
    try {
      const kitchenDocRef = doc(kitchensCollectionRef, kitchen.place_id);
      await setDoc(kitchenDocRef, {
        place_id: kitchen.place_id,
        place_name: kitchen.place_name,
        formatted_address: kitchen.formatted_address,
        photo_url: kitchen.photo_url || null,
        added_by: currentUser.value.uid,
        team: [currentUser.value.uid],
        search_phrase: generateSearchPhrase(kitchen.place_name, kitchen.formatted_address)
      });
      alert('Kitchen created successfully!');
    } catch (error) {
      console.error('Error creating kitchen:', error);
      alert('Failed to create kitchen. Please try again.');
    }
  };

  return {
    createKitchen,
  };
}
