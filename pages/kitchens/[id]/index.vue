<!-- kitchens/[id]/index.vue -->
<template>
  <client-only>
    {{ kitchen }}
    <div v-if="kitchen" class="index">
      <!-- Kitchen Header -->
      <OrganismsKitchenHeader :kitchen="kitchen" />

      <!-- Dashboard or team access check -->
      <div v-if="isInKitchenTeam">
        <OrganismsKitchenDashboard :kitchen="kitchen" />
      </div>
      <div v-else>
        <p>You are not in this kitchen team.</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser, useDocument } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

// Fetch the kitchen document based on route params
const kitchenDocRef = computed(() =>
  currentUser.value ? doc(db, "kitchens", route.params.id)
    : null
);

const { data: kitchen } = useDocument(kitchenDocRef);

// Check if the current user is part of the kitchen team
const isInKitchenTeam = computed(() => {
  if (!kitchen.value || !currentUser.value) return false;
  return kitchen.value.team.includes(currentUser.value.uid);
});
</script>
