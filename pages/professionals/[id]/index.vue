<!-- pages/professionals/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && professional" class="profile">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Professional Profile View -->
      <OrganismsProfessionalView :professional="professional" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        parent="professionals"
        :userApps="miseboxUser.user_apps" 
      />
    </div>
    <div v-else>
      <!-- Loading State -->
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useDocument, useFirestore, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useRoute } from "vue-router";

// VueFire and Firebase setup
const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

// Fetch Misebox User Document
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", route.params.id) : null
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Fetch Professional Profile Document
const professionalDocRef = computed(() =>
  currentUser.value ? doc(db, "professionals", route.params.id) : null
);
const { data: professional } = useDocument(professionalDocRef);
</script>

<style>
.edit-page {
  width: 100%; /* Default to full width for mobile */
  margin: 0 auto; /* Center the container on larger screens */
}

@media (min-width: 768px) { /* Adjust breakpoint as needed */
  .edit-page {
    width: 80%; /* Restrict width on larger screens */
  }
}
</style>
