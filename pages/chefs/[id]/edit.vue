<template>
  <client-only>
    <div class="profile-forms">
      <!-- Authorization Check -->
      <div v-if="chef">
        <h3>Edit your Chef Profile</h3>

        <!-- Header Component -->
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <!-- Edit Form Component -->
        <OrganismsChefEdit v-if="isViewingOwn" />
      </div>
      <div v-else>
        <p class="access-denied-message">
          Access Denied. You are not authorized to edit this profile.
        </p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";

// Router and Firestore setup
const router = useRouter();
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch Firestore documents
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);

const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", currentUser.value.uid) : null
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);
const { data: chef } = useDocument(chefDocRef);

// Authorization Check
const isViewingOwn = computed(() => {
  return currentUser.value?.uid === route.params.id;
});
</script>

<style scoped>
.profile-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.access-denied-message {
  text-align: center;
  color: var(--text-danger);
  margin-top: var(--spacing-m);
}
</style>
