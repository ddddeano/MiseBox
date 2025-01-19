<!-- pages/kitchens/[id]/edit.vue -->
<template>
  <client-only>
    <div v-if="kitchen && isCurrentChefInTeam" class="page edit-page">
      <h1>Edit Kitchen: {{ kitchen.name }}</h1>

      <!-- Kitchen Edit Form -->
      <OrganismsKitchenEdit :kitchen="kitchen" />

      <!-- Action Buttons -->
      <div class="action-buttons">
        <NuxtLink class="icon-btn" :to="`/kitchens/${kitchen.id}/dashboard`">
          <BuildingLibraryIcon class="icon" />
          <span>Dashboard</span>
        </NuxtLink>
        <button class="icon-btn delete-btn" @click="confirmDeleteKitchen">
          <TrashIcon class="icon" />
          <span>Delete Kitchen</span>
        </button>
      </div>
    </div>
    <div v-else-if="kitchen">
      <p class="access-denied-message">
        You do not have permission to edit or delete this kitchen.
      </p>
    </div>
    <div v-else>
      <p class="loading">Loading kitchen data...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { fetchKitchen, deleteKitchen } = useKitchen();
const { currentChef } = useChef();

const kitchen = fetchKitchen(route.params.id);

// Check if the current chef is part of the kitchen team
const isCurrentChefInTeam = computed(() =>
  kitchen.value?.current_team?.some((member) => member.id === currentChef.value?.id)
);

const confirmDeleteKitchen = async () => {
  if (!kitchen.value) {
    console.error("[Edit Page] No kitchen loaded.");
    return;
  }

  const confirmed = confirm("Are you sure you want to delete this kitchen?");
  if (!confirmed) return;

  try {
    await deleteKitchen(kitchen.value);
    router.push("/kitchens");
  } catch (error) {
    console.error("[Edit Page] Error deleting kitchen:", error);
    alert("Failed to delete kitchen. Please try again.");
  }
};
</script>
