<template>
  <div class="detailed-recipe-edit">
    <h1>Edit Recipe: {{ recipe.name }}</h1>
    <div v-if="recipe">
      <label for="ingredients">Ingredients</label>
      <textarea
        id="ingredients"
        v-model="recipe.ingredients"
        placeholder="List ingredients"
        class="editable-textarea"
      ></textarea>

      <label for="steps">Steps</label>
      <textarea
        id="steps"
        v-model="recipe.steps"
        placeholder="List steps"
        class="editable-textarea"
      ></textarea>

      <!-- Image Upload or URL -->
      <label for="image-url">Image URL</label>
      <input
        type="text"
        id="image-url"
        v-model="recipe.image_url"
        placeholder="Enter image URL"
        class="editable-input"
      />

      <!-- Save Button -->
      <button @click="saveRecipeDetails" class="btn btn-primary btn-sm">Save Details</button>
    </div>
    <div v-else>
      <p>Loading recipe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const id = route.params.id;
const recipeId = route.params.recipeId;

const recipe = ref(null);

onMounted(async () => {
  await loadRecipe();
});

const loadRecipe = async () => {
  const chefDocRef = doc(db, 'chefs', id);
  const chefDocSnap = await getDoc(chefDocRef);
  if (chefDocSnap.exists()) {
    const chefData = chefDocSnap.data();
    const recipes = chefData.recipes || [];
    const foundRecipe = recipes.find((r) => r.id === recipeId);
    if (foundRecipe) {
      recipe.value = { ...foundRecipe };
    } else {
      alert('Recipe not found.');
      router.push(`/chefs/${id}/edit`);
    }
  } else {
    alert('Chef not found.');
    router.push('/');
  }
};

const saveRecipeDetails = async () => {
  const chefDocRef = doc(db, 'chefs', id);
  const chefDocSnap = await getDoc(chefDocRef);
  if (chefDocSnap.exists()) {
    const chefData = chefDocSnap.data();
    const recipes = chefData.recipes || [];

    // Remove the old recipe and add the updated one
    const updatedRecipes = recipes.filter((r) => r.id !== recipeId);
    updatedRecipes.push(recipe.value);

    await updateDoc(chefDocRef, {
      recipes: updatedRecipes,
    });

    alert('Recipe details saved.');
    router.push(`/chefs/${id}/edit`);
  } else {
    alert('Chef not found.');
    router.push('/');
  }
};
</script>

<style scoped>
.detailed-recipe-edit {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.editable-textarea,
.editable-input {
  width: 100%;
  margin-bottom: 10px;
}

.btn {
  margin-top: 10px;
}
</style>
