<!-- components/organisms/Supplier/Cell.vue -->
<template>
  <div
    class="cell supplier-cell"
    :class="{ 'in-firestore': supplier.source === 'firestore' }"
    v-if="supplier"
  >
    <!-- Header Section -->
    <NuxtLink
      v-if="!isDisabled"
      :to="`/suppliers/${supplier.id || supplier.place_id}`"
      class="cell-header"
    >
      <!-- Avatar Section -->
      <div v-if="supplier.photo_url" class="cell-avatar">
        <MoleculesAvatar :url="supplier.photo_url" size="small" altText="Supplier Avatar" />
      </div>
      <!-- Header Content -->
      <div class="header-content">
        <div class="title">{{ supplierDisplayName }}</div>
        <div class="subtitle">{{ supplierAddress }}</div>
      </div>
      <!-- Navigation Icon -->
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Disabled Link (Visual Only) -->
    <div v-else class="cell-header">
      <div v-if="supplier.photo_url" class="cell-avatar">
        <MoleculesAvatar :url="supplier.photo_url" size="small" altText="Supplier Avatar" />
      </div>
      <div class="header-content">
        <div class="title">{{ supplierDisplayName }}</div>
        <div class="subtitle">{{ supplierAddress }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

// Compute the display name for the supplier
const supplierDisplayName = computed(() => {
  return props.supplier.place_name || "Unnamed Supplier";
});

// Compute the supplier address for display
const supplierAddress = computed(() => {
  return props.supplier.formatted_address || "Address Unknown";
});
</script>
