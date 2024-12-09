<template>
  <div class="list">
    <!-- List of Chefs -->
    <div
      v-if="items.length"
      v-for="chef in items"
      :key="chef.id"
      class="list-item"
    >
      <OrganismsChefCell :chef="chef" />
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
      No more chefs to display.
    </p>
  </div>
</template>

<script setup>
import { usePaginatedCollection } from "@/composables/usePaginatedCollection";

// Fetch paginated list of chefs, excluding the current user
const { items, fetchItems, isLoading, hasMore } = usePaginatedCollection("chefs", 10, {
  excludeCurrentUser: true,
});

// Fetch the initial page of chefs
fetchItems();
</script>
