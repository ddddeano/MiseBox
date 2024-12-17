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
    <p v-else class="list-empty">No chefs found.</p>
  </div>
</template>

<script setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";
import { computed } from "vue";

const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch all chefs
const collectionRef = computed(() =>
  currentUser.value ? collection(db, "chefs") : null
);
const { data: chefs } = useCollection(collectionRef);

// Filter out the current user's chef profile
const filteredChefs = computed(() =>
chefs.value?.filter((chef) => chef.id !== currentUser.value.uid) || []
);
</script>

<style scoped>
/* Same styles as MiseboxUserList */
</style>
