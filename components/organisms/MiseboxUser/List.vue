<template>
  <div class="list">
    <!-- List of Users -->
    <div
      v-if="items.length"
      v-for="miseboxUser in items"
      :key="miseboxUser.id"
      class="list-item"
    >
      <OrganismsMiseboxUserCell :miseboxUser="miseboxUser" />
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
      No more users to display.
    </p>

    <!-- No Users Found -->
    <p v-if="!isLoading && !items.length" class="no-users-message">
      No users found.
    </p>
  </div>
</template>

<script setup>
import { usePaginatedCollection } from "@/composables/usePaginatedCollection";

// Initialize pagination for `misebox-users` collection, excluding current user
const { items, fetchItems, isLoading, hasMore } = usePaginatedCollection("misebox-users", 10, {
  excludeCurrentUser: true,
});

// Fetch the initial page of users when the component loads
fetchItems();
</script>
