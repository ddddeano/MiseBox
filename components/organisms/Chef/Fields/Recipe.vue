<template>
  <div class="recipe-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <h3>{{ recipe.name || 'Recipe Name' }}</h3>
      <!-- Link to detailed recipe page -->
      <NuxtLink
        :to="`/chefs/${id}/recipe/${recipe.id}/edit`"
        class="btn btn-secondary btn-sm"
      >
        Edit Details
      </NuxtLink>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <label for="recipe-name">Recipe Name</label>
      <input
        type="text"
        id="recipe-name"
        v-model="recipe.name"
        placeholder="Enter recipe name"
        class="editable-input"
      />
      <!-- Save Button -->
      <button @click="saveRecipe" class="btn btn-primary btn-sm">Save</button>

      <!-- Link to advanced recipe creation if a name is provided -->
      <NuxtLink
        v-if="recipe.name.trim()"
        :to="`/chefs/${id}/recipe/create?name=${recipe.name.trim()}`" 
        class="btn btn-secondary btn-sm"
      >
        Go to Advanced Creation
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  recipe: {
    type: Object,
    default: () => ({
      name: '',
    }),
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const db = useFirestore();

const saveRecipe = async () => {
  if (!recipe.name.trim()) {
    alert('Recipe name is required.');
    return;
  }

  try {
    const chefDocRef = doc(db, 'chefs', id);
    await updateDoc(chefDocRef, {
      recipes: arrayUnion({ name: recipe.name }),
    });

    alert('Recipe saved successfully!');
  } catch (error) {
    console.error('Error saving recipe:', error);
    alert('Failed to save the recipe. Please try again.');
  }
};
</script>

<style scoped>
.recipe-form {
  width: 100%;
}

.btn {
  margin-top: 10px;
}
</style>
