<!-- pages/misebox-users/[id]/edit.vue -->
<!-- ============================
pages/misebox-users/[id]/edit.vue
============================ -->

<template>
  <client-only>
    <OrganismsMiseboxUserEdit v-if="isAuthorised" :miseboxUser="miseboxUser" />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

const route = useRoute();
const currentUser = useCurrentUser();

const { fetchMiseboxUser } = useMiseboxUser();

const miseboxUser = fetchMiseboxUser(route.params.id);
const isAuthorised = computed(() => currentUser.value?.uid === route.params.id);
</script>
