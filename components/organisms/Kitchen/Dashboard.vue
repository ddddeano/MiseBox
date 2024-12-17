<!-- components/organisms/Kitchen/Dashboard.vue -->
<!-- dashboard/Dashboard.vue -->
<template>
  <div class="kitchen-dashboard">
    <!-- Tab Bar -->
    <div class="tab-bar">
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'ingredients' }"
        @click="viewMode = 'ingredients'"
      >
        Ingredients Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'stats' }"
        @click="viewMode = 'stats'"
      >
        Stats Manager
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: viewMode === 'tasks' }"
        @click="viewMode = 'tasks'"
      >
        Task Manager
      </button>
    </div>

    <!-- Content based on viewMode -->
    <div v-if="viewMode === 'ingredients'">
      <OrganismsKitchenIngredientsManager
        :kitchenId="kitchen.id"
        @ingredients-fetched="updateDebugIngredients"
      />
    </div>
    <div v-else-if="viewMode === 'stats'">
      <OrganismsKitchenStatsManager :kitchenId="kitchen.id" />
    </div>
    <div v-else-if="viewMode === 'tasks'">
      <OrganismsKitchenTasksManager :kitchenId="kitchen.id" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

const viewMode = ref('ingredients');
const debugIngredients = ref([]);

const updateDebugIngredients = (ingredients) => {
  debugIngredients.value = ingredients;
};
</script>

<style scoped>

</style>
