<!-- components/organisms/Chef/List.vue -->
<template>
  <div class="list">
    <div v-if="filteredChefs?.length" class="list">
      <OrganismsChefCell
        v-for="chef in filteredChefs"
        :key="chef.id"
        :chef="chef"
      />
    </div>
    <p v-else>No chefs found.</p>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();

const { chefsCollection } = useChef();

const chefs = chefsCollection();

const filteredChefs = computed(() =>
  chefs?.value?.filter((chef) => chef.id !== currentUser.value?.uid) || []
);
</script>
