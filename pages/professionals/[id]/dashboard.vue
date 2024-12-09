<template>
  <client-only>
    <div class="dashboard">
      <!-- Authorization Check -->
      <div v-if="professional">
        <h3>Professional Dashboard</h3>

        <!-- Header Component -->
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <!-- Dashboard Component -->
        <OrganismsProfessionalDashboard v-if="isViewingOwnRoute" />
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

// Fetch Firestore documents
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);

const professionalDocRef = computed(() =>
  currentUser.value ? doc(db, "professionals", currentUser.value.uid) : null
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);
const { data: professional } = useDocument(professionalDocRef);

// Authorization Check
const isViewingOwnRoute = computed(() => {
  return currentUser.value?.uid === route.params.id;
});
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
