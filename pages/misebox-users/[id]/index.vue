<template>
  <client-only>
    <div v-if="miseboxUser" class="shared-view-profile-index">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- User Profile View -->
      <OrganismsMiseboxUserView :miseboxUser="miseboxUser" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        parent="misebox-users"
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

// VueFire and Firebase setup
const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

// Fetch Misebox User Document
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", route.params.id) : null
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
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
