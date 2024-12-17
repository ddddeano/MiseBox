<!-- pages/chefs/[id]/dashboard.vue -->
<template>
  <client-only>
    <div class="dashboard">
      <div v-if="isViewingOwn && chef">
        <h3>Chef Dashboard</h3>

        <!-- Header Component -->
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <!-- Dashboard Component -->
        <OrganismsChefDashboard />
      </div>
      <div v-else>
        <p class="access-denied-message">
          Access Denied. You are not authorized to view this dashboard.
        </p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";

// Firestore and Routing Setup
const router = useRouter();
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch Misebox User Document
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Fetch Chef Profile Document
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", route.params.id) : null
);

const { data: chef } = useDocument(chefDocRef);

// Authorization Check
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l);
}

.access-denied-message {
  text-align: center;
  color: var(--text-danger);
  margin-top: var(--spacing-m);
}
</style>
