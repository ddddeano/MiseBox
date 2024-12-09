<template>
  <div class="list">
    <!-- List of Suppliers -->
    <div
      v-if="items.length"
      v-for="supplier in items"
      :key="supplier.id"
      class="list-item"
    >
      <OrganismsSupplierCell :supplier="supplier" />
    </div>

    <!-- Loading Indicator -->
    <p v-if="isLoading" class="loading-message">Loading...</p>

    <!-- Load More Button -->
    <button
      v-if="hasMore && !isLoading"
      @click="fetchItems"
      class="btn"
    >
      Load More
    </button>

    <!-- End of List Message -->
    <p v-if="!hasMore && items.length" class="end-of-list-message">
      No more suppliers to display.
    </p>
  </div>
</template>

<script setup>
import { usePaginatedCollection } from "@/composables/usePaginatedCollection";

// Fetch paginated list of suppliers, excluding the current user
const { items, fetchItems, isLoading, hasMore } = usePaginatedCollection("suppliers", 10, {
  excludeCurrentUser: true,
});

// Fetch the initial page of suppliers
fetchItems();
</script>
