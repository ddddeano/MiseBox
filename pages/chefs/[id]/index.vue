<!-- pages/chefs/[id]/index.vue -->
<!-- pages/chefs/[id].vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && chef" class="profile">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Chef Profile View -->
      <OrganismsChefView :chef="chef" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        parent="chefs"
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

// Fetch Chef Profile Document
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", route.params.id) : null
);
const { data: chef } = useDocument(chefDocRef);
</script>
