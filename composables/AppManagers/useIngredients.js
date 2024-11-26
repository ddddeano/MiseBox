// composables/useIngredients.js
import { useFirestore } from 'vuefire';
import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useCurrentUser } from 'vuefire';

export function useIngredients(kitchenId) {
  const firestore = useFirestore();
  const currentUser = useCurrentUser();

  if (!kitchenId) {
    throw new Error('[useIngredients] Missing kitchenId parameter');
  }

  // Reference to the ingredients collection for the given kitchen
  const ingredientsCollectionRef = collection(firestore, `kitchens/${kitchenId}/ingredients`);

  // Add a new ingredient
  const addIngredient = async (ingredient) => {
    if (!currentUser.value) {
      alert('You must be logged in to add an ingredient.');
      return null;
    }

    try {
      const ingredientData = {
        ...ingredient,
        added_by: currentUser.value.uid,
        timestamp: new Date(),
      };

      console.log('[addIngredient] Adding ingredient to Firestore:', ingredientData);
      const docRef = await addDoc(ingredientsCollectionRef, ingredientData);

      return docRef.id; // Return the generated document ID
    } catch (error) {
      console.error('[addIngredient] Error:', error);
      alert('Failed to add ingredient. Please try again.');
      return null;
    }
  };

  // Update an existing ingredient
  const updateIngredient = async (ingredientId, updatedFields) => {
    if (!currentUser.value) {
      alert('You must be logged in to update an ingredient.');
      return;
    }

    try {
      const ingredientDocRef = doc(ingredientsCollectionRef, ingredientId);

      console.log(`[updateIngredient] Updating ingredient ${ingredientId}:`, updatedFields);
      await updateDoc(ingredientDocRef, updatedFields);

      console.log('[updateIngredient] Ingredient updated successfully.');
    } catch (error) {
      console.error('[updateIngredient] Error:', error);
      alert('Failed to update ingredient. Please try again.');
    }
  };

  // Delete an ingredient
  const deleteIngredient = async (ingredientId) => {
    if (!currentUser.value) {
      alert('You must be logged in to delete an ingredient.');
      return;
    }

    try {
      const ingredientDocRef = doc(ingredientsCollectionRef, ingredientId);

      console.log(`[deleteIngredient] Deleting ingredient: ${ingredientId}`);
      await deleteDoc(ingredientDocRef);

      alert('Ingredient deleted successfully!');
    } catch (error) {
      console.error('[deleteIngredient] Error:', error);
      alert('Failed to delete ingredient. Please try again.');
    }
  };

  return {
    addIngredient,
    updateIngredient,
    deleteIngredient,
  };
}

