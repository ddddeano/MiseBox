<template>
  <div>
    <!-- Tab Menu -->
    <div class="tab-bar">
      <button
        class="btn btn-tab"
        :class="{ active: !showOnOrder }"
        @click="showOnOrder = false"
      >
        Available Ingredients
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: showOnOrder }"
        @click="showOnOrder = true"
      >
        On-Order Ingredients
      </button>
    </div>

    <!-- Ingredient List -->
    <ul v-if="filteredIngredients.length" class="list">
      <OrganismsKitchenIngredientsCell
        v-for="ingredient in filteredIngredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        :kitchenId="kitchenId"
        :mode="'ordering'"
      />
    </ul>
    <p v-else class="no-data-message">
      No ingredients available in this category.
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

const props = defineProps({
  kitchenId: {
    type: String,
    required: true,
  },
});

const db = useFirestore();
const showOnOrder = ref(false);

// Reference to the kitchen ingredients collection
const kitchenIngredientsRef = computed(() =>
  collection(db, `kitchens/${props.kitchenId}/ingredients`)
);

// Reactive data for ingredients
const { data: ingredients } = useCollection(kitchenIngredientsRef);

// Filter ingredients based on the selected tab
const filteredIngredients = computed(() =>
  showOnOrder.value
    ? ingredients.value.filter((ingredient) => ingredient.onOrder)
    : ingredients.value.filter((ingredient) => !ingredient.onOrder)
);
</script>
