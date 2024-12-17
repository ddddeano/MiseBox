<!-- pages/recruiters/[id]/index.vue -->
<!-- pages/recruiters/[id].vue -->
<template>
  <client-only>
    <div v-if="miseboxUser && recruiter" class="profile">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

      <!-- Recruiter Profile View -->
      <OrganismsRecruiterView :recruiter="recruiter" />

      <!-- Universal Bubble Navigation -->
      <OrganismsUniversalBubble 
        :id="miseboxUser.id" 
        parent="recruiters"
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

// Fetch Recruiter Profile Document
const recruiterDocRef = computed(() =>
  currentUser.value ? doc(db, "recruiters", route.params.id) : null
);
const { data: recruiter } = useDocument(recruiterDocRef);
</script>
