<!-- components/organisms/Chef/link/Kitchen/Cell.vue -->
<template>
  <div v-if="kitchenData" class="cell kitchen-cell">
    <!-- Header Section -->
    <NuxtLink :to="`/kitchens/${kitchenData.id}`" class="cell-header">
      <!-- Avatar Section -->
      <div v-if="kitchenData.avatar || kitchenData.photo_url" class="cell-avatar">
        <MoleculesAvatar :url="kitchenData.avatar || kitchenData.photo_url" size="small" altText="Kitchen Avatar" />
      </div>
      
      <!-- Header Content -->
      <div class="header-content">
        <div class="title">{{ kitchenData.name }}</div>
        <div class="subtitle">{{ kitchenLocation }}</div>
      </div>

      <!-- Chevron Icon -->
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
  </div>
  <div v-else>
    <p>Loading kitchen...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

const { fetchKitchen } = useKitchen();

// Reactive fetch using props.kitchen.id
const kitchenData = fetchKitchen(props.kitchen.id);

// Compute the kitchen location for display
const kitchenLocation = computed(() => {
  const { formatted_address } = kitchenData.value || {};
  return formatted_address || "No address available";
});
</script>
