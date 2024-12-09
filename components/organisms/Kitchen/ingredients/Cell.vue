<template>
  <li class="cell">
    <!-- Header with toggle and basic info -->
    <div class="cell-header">
      <button @click="toggleExpand" class="cell-toggle">
        <span class="cell-name">{{ ingredient.name }}</span>
      </button>
    </div>

    <!-- Expanded Metadata -->
    <div v-if="isExpanded" class="cell-meta">
      <!-- Basic View Metadata -->
      <div v-if="mode === 'basic'" class="meta-basic">
        <p><strong>Category:</strong> {{ ingredient.category || 'Uncategorized' }}</p>
        <p><strong>Quantity:</strong> {{ ingredient.quantity || 'Not specified' }}</p>
        <p><strong>Description:</strong> {{ ingredient.description || 'No description' }}</p>
        <NuxtLink :to="ingredientEditRoute" class="btn btn-secondary">
          View/Edit Full Details
        </NuxtLink>
      </div>

      <!-- Ordering View Metadata -->
      <div v-else-if="mode === 'ordering'" class="meta-ordering">
        <p><strong>On Order:</strong> {{ ingredient.onOrder ? 'Yes' : 'No' }}</p>
        <p><strong>Expected Delivery:</strong> {{ ingredient.deliveryDate || 'No date set' }}</p>
        <p><strong>Supplier:</strong> {{ ingredient.supplier || 'No supplier assigned' }}</p>
        <NuxtLink :to="ingredientOrderEditRoute" class="btn btn-secondary">
          Edit Ordering Details
        </NuxtLink>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  kitchenId: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: 'basic', // 'basic' or 'ordering'
  },
});

const isExpanded = ref(false);

// Toggle expanded state
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Define routes for easier understanding
const ingredientEditRoute = computed(
  () => `/kitchens/${props.kitchenId}/ingredients/${props.ingredient.id}`
);
const ingredientOrderEditRoute = computed(
  () => `/kitchens/${props.kitchenId}/ingredients/${props.ingredient.id}/order`
);
</script>
