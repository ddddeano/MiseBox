<!-- components/organisms/Kitchen/Edit.vue -->
<template>
  <client-only>
    <div v-if="kitchen && isCurrentUserInTeam" class="edit-view">
      <!-- Avatar Selection -->
      <MoleculesFormsAvatarSelection
        collectionName="kitchens"
        :item="kitchen"
      />

      <!-- Kitchen Name -->
      <MoleculesFormsSingleField
        label="Kitchen Name"
        collectionName="kitchens"
        target="name"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.name"
        placeholder="Enter your kitchen name"
      />

      <!-- Formatted Address -->
      <MoleculesFormsSingleField
        label="Formatted Address"
        collectionName="kitchens"
        target="formatted_address"
        :documentID="kitchen.id"
        :firebaseValue="kitchen.formatted_address"
        placeholder="Enter the address"
      />
    </div>
    <div v-else-if="kitchen && !isCurrentUserInTeam">
      <p class="access-denied-message">
        You do not have permission to edit this kitchen.
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
import { useCurrentUser } from "vuefire";

const { fetchKitchen } = useKitchen();
const currentUser = useCurrentUser();
const { id } = useRoute().params;

// Fetch kitchen data
const kitchen = fetchKitchen(id);

// Check if the current user is part of the kitchen team
const isCurrentUserInTeam = computed(() => {
  const team = kitchen.value?.current_team || [];
  const currentUserId = currentUser.value?.uid;
  return team.some((member) => member.id === currentUserId);
});
</script>

<style scoped>
.edit-view {
  display: flex;
  flex-direction: column;
  align-content: center;
  max-width: 600px;
  width: 100%;
}
</style>
