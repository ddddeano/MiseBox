<template>
  <client-only>
    <div v-if="miseboxUser && professional" class="shared-view-profile-index">
      <!-- Header Component -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Professional View Component -->
      <OrganismsProfessionalView :professional="professional" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        :parent="'professionals'" 
        :userApps="miseboxUser.user_apps" 
      />
    </div>
    <div v-else>
      <!-- Loading State -->
      <p class="shared-view-profile-loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useDocument, useFirestore, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useRoute } from "vue-router";

const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

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

<style scoped>
.shared-view-profile-index {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shared-view-profile-loading {
  text-align: center;
  color: var(--text-secondary);
  margin-top: var(--spacing-m);
}
</style>
