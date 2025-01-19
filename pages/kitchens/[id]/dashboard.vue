<!-- pages/kitchens/[id]/dashboard.vue -->
<template>
  <client-only>
    <div v-if="kitchen && isCurrentChefInTeam" class="page dashboard-view">
      <h1>Kitchen Dashboard: {{ kitchen.name }}</h1>

      <!-- Navigation Buttons -->
      <div class="action-buttons">
        <NuxtLink class="icon-btn" :to="`/kitchens/${kitchen.id}`">
          <UserCircleIcon class="icon" />
          <span>Profile</span>
        </NuxtLink>
        <NuxtLink class="icon-btn" :to="`/kitchens/${kitchen.id}/edit`">
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
      </div>

      <!-- Kitchen Dashboard -->
      <OrganismsKitchenDashboard :kitchen="kitchen" />
    </div>
    <div v-else-if="kitchen">
      <p class="access-denied-message">
        You do not have permission to view this dashboard.
      </p>
    </div>
    <div v-else>
      <p class="loading">Loading kitchen data...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const { fetchKitchen } = useKitchen();
const { currentChef } = useChef();

const kitchen = fetchKitchen(route.params.id);

// Check if the current chef is part of the kitchen team
const isCurrentChefInTeam = computed(() =>
  kitchen.value?.current_team?.some((member) => member.id === currentChef.value?.id)
);
</script>
