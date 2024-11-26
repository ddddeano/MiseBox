<template>
  <client-only>
    <div v-if="miseboxUser && chef" class="shared-view-profile-index">
      <MoleculesMiseboxUserHeader :fetchedMiseboxUser="miseboxUser" />
      <OrganismsChefViewProfile :chef="chef" />
      <OrganismsUniversalBubble :id="miseboxUser.id" parent="chefs" />

      <!-- Segue to Dashboard for Own Profile -->
      <NuxtLink
        v-if="isViewingOwnRoute"
        :to="`/chefs/${chef.id}/dashboard`"
        class="btn btn-primary btn-pill"
      >
        Go to Dashboard
      </NuxtLink>
    </div>
    <div v-else>
      <p class="shared-view-profile-loading">Loading...</p>
      <NuxtLink v-if="!currentUser" to="/auth" class="btn btn-primary btn-pill">
        Go to Auth
      </NuxtLink>
    </div>
    <button @click="logout" class="btn btn-secondary btn-pill">
      Sign Out
    </button>
  </client-only>
</template>

<script setup>
import { useFirestore, useDocument, useCurrentUser } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

const db = useFirestore();
const currentUser = useCurrentUser();
const route = useRoute();
const router = useRouter();

// Fetch the Misebox user data
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', route.params.id) : undefined
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Fetch the Chef profile data
const chefDocRef = computed(() =>
  currentUser.value ? doc(db, 'chefs', route.params.id) : undefined
);

const { data: chef } = useDocument(chefDocRef);

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

.shared-view-profile-loading {
  text-align: center;
  color: var(--text-secondary);
  margin-top: var(--spacing-m);
}
</style>
