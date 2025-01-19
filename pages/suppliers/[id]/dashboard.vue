<!-- pages/suppliers/[id]/dashboard.vue -->
<!-- ============================
pages/suppliers/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
    <OrganismsSupplierDashboard
      v-if="isAuthorised && supplier"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();
const { fetchSupplier } = useSupplier();

const miseboxUser = fetchMiseboxUser(route.params.id);
const supplier = fetchSupplier(route.params.id);
const isAuthorised = computed(() => currentUser.value?.uid === route.params.id);
</script>
