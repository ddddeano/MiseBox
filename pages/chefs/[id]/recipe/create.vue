<template>
  <div class="create-recipe-container">
    <h1>Create a New Recipe</h1>
    <label for="recipe-name">Recipe Name</label>
    <input
      type="text"
      id="recipe-name"
      v-model="recipe.name"
      placeholder="Enter recipe name"
      class="form-control"
    />

    <!-- Include Child Components -->
    <OrganismsChefRecipeIngredient
      :ingredients="recipe.ingredients"
      @update-ingredients="updateIngredients"
    />
    <OrganismsChefRecipeMiseEnPlace
      :mise-en-place="recipe.miseEnPlace"
      @update-mise-en-place="updateMiseEnPlace"
    />
    <OrganismsChefRecipeInstructions
      :instructions="recipe.instructions"
      @update-instructions="updateInstructions"
    />

    <!-- Save Button -->
    <button @click="saveRecipe" class="btn btn-primary">Save Recipe</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useCurrentUser, useFirestore } from 'vuefire';
import { setDoc, doc } from 'firebase/firestore';

const currentUser = useCurrentUser();
const db = useFirestore();

const recipe = reactive({
  name: '',
  ingredients: [],
  miseEnPlace: [],
  instructions: [],
  author: {
    id: currentUser.value?.uid,
    name: currentUser.value?.displayName || 'Anonymous',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

const updateIngredients = (newIngredients) => {
  recipe.ingredients = newIngredients;
};

const updateMiseEnPlace = (newMiseEnPlace) => {
  recipe.miseEnPlace = newMiseEnPlace;
};

const updateInstructions = (newInstructions) => {
  recipe.instructions = newInstructions;
};

const saveRecipe = async () => {
  if (!recipe.name.trim()) {
    alert('Recipe name is required.');
    return;
  }

  const recipeId = Date.now().toString(); // Unique ID generation for simplicity
  const recipeDocRef = doc(db, 'recipes', recipeId);

  try {
    await setDoc(recipeDocRef, recipe);
    alert('Recipe created successfully!');
  } catch (error) {
    console.error('Error creating recipe:', error);
    alert('Failed to create the recipe. Please try again.');
  }
};
</script>

<style scoped>
.create-recipe-container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.form-control {
  margin-bottom: 1rem;
  width: 100%;
}

.btn {
  display: block;
  margin: 1rem 0;
}
</style>
