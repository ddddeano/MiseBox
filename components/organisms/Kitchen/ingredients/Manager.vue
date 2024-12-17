<!-- components/organisms/Kitchen/ingredients/Manager.vue -->
<template>
  <div class="manager">
    <h2>Ingredients Manager</h2>

    <OrganismsKitchenIngredientsForm :kitchenId="kitchenId" />

    <!-- Mode Switcher -->
    <div class="tab-bar">
      <button
        class="btn btn-tab"
        :class="{ active: mode === 'basic' }"
        @click="mode = 'basic'"
      >
        Basic View
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: mode === 'ordering' }"
        @click="mode = 'ordering'"
      >
        Ordering View
      </button>
    </div>

    <!-- Basic View -->
    <div v-if="mode === 'basic'">
      <h3>Basic Ingredient List</h3>
      <OrganismsKitchenIngredientsModeBasic :kitchenId="kitchenId" />
    </div>

    <!-- Ordering View -->
    <div v-else-if="mode === 'ordering'">
      <h3>Ordering Ingredient List</h3>
      <OrganismsKitchenIngredientsModeOrdering :kitchenId="kitchenId" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchenId: {
    type: String,
    required: true,
  },
});

const mode = ref('basic'); // 'basic' or 'ordering'
</script>

<style scoped>
.manager {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}

</style>
