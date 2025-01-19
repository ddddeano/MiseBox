<!-- pages/chefs/[id]/dashboard.vue -->
<!-- ============================
pages/chefs/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
    <OrganismsChefDashboard
      v-if="isAuthorised && chef"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchChef } = useChef();

const miseboxUser = fetchMiseboxUser(route.params.id);
const chef = fetchChef(route.params.id);
const isAuthorised = computed(() => currentUser.value?.uid === route.params.id);
</script>
