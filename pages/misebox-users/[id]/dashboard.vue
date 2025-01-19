<!-- pages/misebox-users/[id]/dashboard.vue -->
<template>
  <client-only>
    <div class="dashboard">
      <div v-if="isViewingOwnRoute && miseboxUser">
        <h3>Misebox User Dashboard</h3>
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
        <OrganismsMiseboxUserDashboard />
      </div>
      <div v-else-if="isViewingOwnRoute">
        <p>You do not have a valid Misebox User profile.</p>
        <NuxtLink to="/misebox-users" class="btn">Go to Misebox Profiles</NuxtLink>
      </div>
      <div v-else>
        <p class="access-denied-message">This is not your dashboard.</p>
        <NuxtLink to="/misebox-users" class="btn">Go to Misebox Profiles</NuxtLink>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const miseboxUser = fetchMiseboxUser(route.params.id);

const isViewingOwnRoute = computed(() => currentUser.value?.uid === route.params.id);
</script>
