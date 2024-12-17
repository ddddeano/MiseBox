<!-- components/organisms/Kitchen/ingredients/List.vue -->
<template>
  <div class="kitchen-ingredients">
    <h2>Ingredients</h2>

    <!-- Add Ingredient Form -->
    <OrganismsKitchenIngredientsForm
      :ingredientsCollectionRef="ingredientsCollectionRef"
      @ingredient-added="handleIngredientAdded"
    />

    <!-- Ingredient List -->
    <ul v-if="ingredients.length" class="ingredients-list">
      <OrganismsKitchenIngredientsCell
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        :kitchenId="kitchenId"
        @ingredient-removed="handleIngredientRemoved"
      />
    </ul>

    <p v-else class="no-ingredients-message">No ingredients added yet.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const props = defineProps({
  kitchenDocRef: {
    type: Object,
    required: true,
  },
  kitchenId: {
    type: String,
    required: true,
  },
});

// Compute reference to ingredients collection
const ingredientsCollectionRef = computed(() =>
  currentUser.value ? collection(kitchenDocRef, 'ingredients') : null
);

// Reactive data for ingredients
const { data: ingredients } = useCollection(ingredientsCollectionRef);

// Handle adding a new ingredient
const handleIngredientAdded = (ingredientName) => {
  console.log(`Ingredient "${ingredientName}" added.`);
};

// Handle removing an ingredient
const handleIngredientRemoved = (ingredientId) => {
  const index = ingredients.value.findIndex((ingredient) => ingredient.id === ingredientId);
  if (index !== -1) {
    ingredients.value.splice(index, 1);
  }
};
</script>

