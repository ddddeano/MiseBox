<!-- pages/recruiters/[id]/dashboard.vue -->
<!-- ============================
pages/recruiters/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
    <OrganismsRecruiterDashboard
      v-if="isAuthorised && recruiter"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchRecruiter } = useRecruiter();

const miseboxUser = fetchMiseboxUser(route.params.id);
const recruiter = fetchRecruiter(route.params.id);
const isAuthorised = computed(() => currentUser.value?.uid === route.params.id);
</script>
