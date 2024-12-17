<!-- pages/misebox-users/[id]/edit.vue -->
<!-- ~/pages/misebox-users/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="miseboxUser">
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />
        <div class="action-buttons">
          <NuxtLink
            v-if="isViewingOwn"
            :to="`/misebox-users/${currentUser.uid}`"
            class="btn"
          >
            View
          </NuxtLink>

          <!-- Delete Button -->
          <button
            v-if="isViewingOwn"
            class="btn"
            @click="deleteMiseboxUser"
          >
            Delete
          </button>
        </div>

        <!-- Edit Form -->
        <OrganismsMiseboxUserEdit
          v-if="isViewingOwn"
          :miseboxUser="miseboxUser"
        />
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
import { useRoute } from "vue-router";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";

// Firestore and Route Setup
const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch the user's Misebox profile document
const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", route.params.id) : null
);

const { data: miseboxUser, deleteMiseboxUser } = useDocument(miseboxUserDocRef);
const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
