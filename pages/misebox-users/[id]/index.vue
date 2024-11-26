<template>
  <client-only>
    <div v-if="miseboxUser" class="shared-view-profile-index">
      <!-- User Header -->
      <MoleculesMiseboxUserHeader :fetchedMiseboxUser="miseboxUser" />

      <!-- User Profile View -->
      <OrganismsMiseboxUserViewProfile :fetchedMiseboxUser="miseboxUser" />

      <!-- Universal Bubble for Related Profiles -->
      <OrganismsUniversalBubble :id="miseboxUser.id" parent="misebox-users" />

      <!-- Edit Profile Button (Visible only when viewing own route) -->
      <NuxtLink
        v-if="isViewingOwnRoute"
        :to="`/misebox-users/${miseboxUser.id}/edit`"
        class="btn btn-primary btn-pill"
      >
        Edit Profile
      </NuxtLink>
    </div>
    <div v-else>
      <!-- Loading State -->
      <p class="shared-view-profile-loading">Loading...</p>
      <!-- Redirect to Auth if not logged in -->
      <NuxtLink v-if="!currentUser" to="/auth" class="btn btn-primary btn-pill">
        Go to Auth
      </NuxtLink>
    </div>
    <!-- Sign Out Button (Visible only when viewing own route) -->
    <button
      v-if="isViewingOwnRoute"
      @click="logout"
      class="btn btn-secondary btn-pill sign-out-button"
    >
      Sign Out
    </button>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

// Fetch routed Misebox user profile from Firestore
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', route.params.id) : undefined
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Check if the current user is viewing their own profile
const isViewingOwnRoute = computed(() => {
  return currentUser.value?.uid === route.params.id;
});

const { logout } = useAuth();
</script>

<style scoped>
.shared-view-profile-index {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-out-button {
  margin-top: var(--spacing-s);
}

.shared-view-profile-loading {
  text-align: center;
  color: var(--text-secondary);
  margin-top: var(--spacing-m);
}
</style>
