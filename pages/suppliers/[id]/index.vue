<!-- pages/suppliers/[id]/index.vue -->
<!-- pages/suppliers/[id].vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && supplier" class="profile">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Supplier Profile View -->
      <OrganismsSupplierView :supplier="supplier" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        parent="suppliers"
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

// Fetch Supplier Profile Document
const supplierDocRef = computed(() =>
  currentUser.value ? doc(db, "suppliers", route.params.id) : null
);
const { data: supplier } = useDocument(supplierDocRef);
</script>
