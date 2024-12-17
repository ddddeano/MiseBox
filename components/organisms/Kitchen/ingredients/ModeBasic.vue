<!-- components/organisms/Kitchen/ingredients/ModeBasic.vue -->
<template>
  <ul v-if="ingredients.length" class="list">
    <OrganismsKitchenIngredientsCell
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      :kitchenId="kitchenId"
      :mode="'basic'"
    />
  </ul>
  <p v-else class="no-data-message">No ingredients found.</p>
</template>

<script setup>
import { computed } from 'vue';
import { useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

const props = defineProps({
  kitchenId: {
    type: String,
    required: true,
  },
});

const db = useFirestore();

// Reference to the kitchen ingredients collection
const kitchenIngredientsRef = computed(() =>
  collection(db, `kitchens/${props.kitchenId}/ingredients`)
);

// Reactive collection data for ingredients
const { data: ingredients } = useCollection(kitchenIngredientsRef);
</script>
