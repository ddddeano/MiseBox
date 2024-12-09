<template>
  <div class="list">
    <!-- List of Professionals -->
    <div
      v-if="items.length"
      v-for="professional in items"
      :key="professional.id"
      class="list-item"
    >
      <OrganismsProfessionalCell :professional="professional" />
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
      No more professionals to display.
    </p>
  </div>
</template>

<script setup>

// Fetch paginated list of professionals, excluding the current user
const { items, fetchItems, isLoading, hasMore } = usePaginatedCollection("professionals", 10, {
  excludeCurrentUser: true,
});

// Fetch the initial page of professionals
fetchItems();
</script>
