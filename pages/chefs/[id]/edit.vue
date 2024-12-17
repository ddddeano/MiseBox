<!-- pages/chefs/[id]/edit.vue -->
<template>
  <client-only>
    <div class="edit-page">
      <div v-if="chef">
        <!-- Header -->
        <MoleculesMiseboxUserHeader :miseboxUser="miseboxUser" />

        <!-- Action Buttons -->
        <div class="action-buttons">
          <NuxtLink
            v-if="isViewingOwn"
            :to="`/chefs/${currentUser.uid}`"
            class="btn"
          >
            View
          </NuxtLink>
          <button
            v-if="isViewingOwn"
            class="btn"
            @click="deleteChef"
          >
            Delete
          </button>
        </div>

        <!-- Edit Form -->
        <OrganismsChefEdit v-if="isViewingOwn" :chef="chef" />
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

const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);

const chefDocRef = computed(() =>
  currentUser.value ? doc(db, "chefs", route.params.id) : null
);

const { data: chef, deleteChef } = useDocument(chefDocRef);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);

const isViewingOwn = computed(() => currentUser.value?.uid === route.params.id);
</script>
