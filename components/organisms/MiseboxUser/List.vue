<!-- components/organisms/MiseboxUser/List.vue -->
<template>
  <div class="list">
    <template v-if="miseboxUsers?.length">
      <div
        v-for="user in filteredMiseboxUsers"
        :key="user.id"
        class="list-item"
      >
        <OrganismsMiseboxUserCell :miseboxUser="user" />
      </div>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch all Misebox Users from Firestore
const collectionRef = computed(() =>
  currentUser.value ? collection(db, "misebox-users") : null
);
const { data: miseboxUsers } = useCollection(collectionRef);

// Filter out the current user's own profile
const filteredMiseboxUsers = computed(() =>
  miseboxUsers?.value?.filter((user) => user.id !== currentUser.value?.uid) || []
);
</script>
