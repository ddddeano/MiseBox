<!-- pages/misebox-users/[id]/index.vue -->
<!-- ~/pages/misebox-users/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="miseboxUser" class="profile">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Edit Button -->
      <NuxtLink
        v-if="isViewingOwn"
        :to="`/misebox-users/${currentUser.uid}/edit`"
        class="btn"
      >
        Edit
      </NuxtLink>

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
      <p class="loading-message">Loading...</p>
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

// Check if the current user owns the profile
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>


