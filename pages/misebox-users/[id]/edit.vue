<template>
  <client-only>
    <div class="profile-forms">
      <!-- Authorization Check -->
      <div v-if="miseboxUser">
        <h3>Edit Your Profile</h3>

        <!-- Header -->
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <!-- Edit Form -->
        <OrganismsMiseboxUserEdit v-if="isViewingOwn" />
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
import { useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";

// Firestore and Route Setup
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch the user's Misebox profile document
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);

const { data: miseboxUser } = useDocument(miseboxUserDocRef);

// Check if the current user owns the profile
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
