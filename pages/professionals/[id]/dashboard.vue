<!-- pages/professionals/[id]/dashboard.vue -->
<!-- ============================
pages/professionals/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
    <OrganismsProfessionalDashboard
      v-if="isAuthorised && professional"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchProfessional } = useProfessional();

const miseboxUser = fetchMiseboxUser(route.params.id);
const professional = fetchProfessional(route.params.id);
const isAuthorised = computed(() => currentUser.value?.uid === route.params.id);
</script>
