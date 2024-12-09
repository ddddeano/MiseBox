<template>
  <client-only>
    <div v-if="miseboxUser && chef" class="shared-view-profile-index">
      <!-- Header Component -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Chef View Component -->
      <OrganismsChefView :chef="chef" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        :parent="'chefs'" 
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
import { computed } from "vue";
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

// Fetch Chef Profile Document
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", route.params.id) : null
);
const { data: chef } = useDocument(chefDocRef);
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
