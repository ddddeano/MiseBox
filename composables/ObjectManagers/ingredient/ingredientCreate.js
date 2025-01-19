// composables/ObjectManagers/ingredient/ingredientCreate.js
export function useIngredientCreate() {
  const { createObject } = useMiseboxFirestore(); // Use createObject for objects like ingredients

  const createIngredient = async (newIngredient) => {
    try {
      if (!newIngredient || typeof newIngredient !== "object") {
        throw new Error("[createIngredient] Invalid input. Must be an object.");
      }

      if (!newIngredient.name || newIngredient.name.trim().length === 0) {
        throw new Error("[createIngredient] Ingredient name is required.");
      }

      // Use createObject to add the ingredient to Firestore
      const ingredientId = await createObject("ingredients", {
        ...newIngredient,
        source: "firestore", // Default source
      });

      console.log("[createIngredient] Ingredient created successfully:", newIngredient);

      return ingredientId; // Return the Firestore-generated ID for routing
    } catch (error) {
      console.error("[createIngredient] Error creating ingredient:", error.message);
      throw error;
    }
  };

  return { createIngredient };
}

