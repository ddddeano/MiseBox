<template>
  <client-only>
    <div v-if="miseboxUser && professional" class="shared-view-profile-index">
      <MoleculesMiseboxUserHeader :fetchedMiseboxUser="miseboxUser" />
      <OrganismsProfessionalViewProfile :professional="professional" />

      <OrganismsUniversalBubble :id="miseboxUser.id" parent="professionals" />
    </div>
    <div v-else>
      <p class="shared-view-profile-loading">Loading...</p>
      <NuxtLink v-if="!currentUser" to="/auth" class="btn btn-primary btn-pill">
        Go to Auth
      </NuxtLink>
    </div>
    <button @click="logout" class="btn btn-secondary btn-pill sign-out-button">
      Sign Out
    </button>
  </client-only>
</template>

<script setup>
import { useDocument, useFirestore, useCurrentUser } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

const currentUser = useCurrentUser();
const route = useRoute();
const router = useRouter();
const db = useFirestore();

// Fetch the Misebox user based on the route ID
const miseboxUserDocRef = computed(() =>
  route.params.id ? doc(db, 'misebox-users', route.params.id) : undefined
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Fetch the Professional profile based on the route ID
const professionalDocRef = computed(() =>
  route.params.id ? doc(db, 'professionals', route.params.id) : undefined
);
const { data: professional } = useDocument(professionalDocRef);

const handleSignOut = () => {
  logout();
};
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
