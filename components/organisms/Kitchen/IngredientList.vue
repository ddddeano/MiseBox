<template>
  <div class="kitchen-ingredients">
    <h2>Ingredients</h2>

    <!-- Add Ingredient Form -->
    <OrganismsKitchenAddIngredientForm
      :ingredientsCollectionRef="ingredientsCollectionRef"
      @ingredient-added="handleIngredientAdded"
    />

    <!-- Ingredient List -->
    <ul v-if="ingredients.length" class="ingredients-list">
      <OrganismsKitchenIngredientListItemCell
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

const ingredientsCollectionRef = computed(() =>
  props.kitchenDocRef ? collection(props.kitchenDocRef, 'ingredients') : null
);

const { data: ingredients } = useCollection(ingredientsCollectionRef);

const handleIngredientAdded = (ingredientName) => {
  console.log(`Ingredient "${ingredientName}" added.`);
};

const handleIngredientRemoved = (ingredientId) => {
  const index = ingredients.value.findIndex((ingredient) => ingredient.id === ingredientId);
  if (index !== -1) {
    ingredients.value.splice(index, 1);
  }
};
</script>

<style scoped>
.kitchen-ingredients {
  margin-top: var(--spacing-m);
}

.ingredients-list {
  list-style: none;
  padding: 0;
}

.no-ingredients-message {
  text-align: center;
  color: var(--text-secondary);
}
</style>
