<!-- pages/kitchens/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="kitchen" class="page profile">
      <!-- Kitchen Header -->
      <header class="kitchen-header">
       <MoleculesAvatar :url="kitchen.avatar" size="large"/>
        <h1>{{ kitchen.name }}</h1>
        <p>{{ kitchen.formatted_address }}</p>
      </header>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <NuxtLink
          v-if="isKitchenLinked"
          class="icon-btn"
          :to="`/kitchens/${kitchen.id}/edit`"
        >
          <Cog6ToothIcon class="icon" />
          <span>Edit</span>
        </NuxtLink>
        <NuxtLink
          v-if="isKitchenLinked"
          class="icon-btn"
          :to="`/kitchens/${kitchen.id}/dashboard`"
        >
          <BuildingLibraryIcon class="icon" />
          <span>Dashboard</span>
        </NuxtLink>
        <button
          v-if="!isKitchenLinked"
          class="icon-btn"
          @click="clickAddKitchenToChef"
        >
          <PlusIcon class="icon" />
          <span>Add to My Kitchens</span>
        </button>
      </div>

      <!-- Team Section -->
      <section class="team-section">
        <h2>Team</h2>
        <div v-if="kitchen.current_team?.length" class="team-list">
          <OrganismsChefPill
            v-for="member in kitchen.current_team"
            :key="member.id"
            :chef="member"
          />
        </div>
        <p v-else>No team members yet.</p>
      </section>

      <!-- Kitchen View -->
      <OrganismsKitchenView :kitchen="kitchen" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchKitchen, addChefToKitchen } = useKitchen();
const { currentChef, addKitchenToChef } = useChef();

const kitchen = fetchKitchen(route.params.id);

const isKitchenLinked = computed(() =>
  (currentChef.value?.kitchens || []).some(
    (linkedKitchen) => linkedKitchen.id === route.params.id
  )
);

// Add chef to kitchen and vice versa
const clickAddKitchenToChef = async () => {
  try {
    if (kitchen.value && currentChef.value) {
      const kitchenData = { id: kitchen.value.id };
      const chefData = { id: currentChef.value.id };

      await addChefToKitchen(kitchen.value.id, chefData);
      await addKitchenToChef(currentChef.value.id, kitchenData);

      console.log("Chef added to kitchen and kitchen added to chef");
    }
  } catch (error) {
    console.error("Error adding chef and kitchen:", error);
  }
};
</script>
