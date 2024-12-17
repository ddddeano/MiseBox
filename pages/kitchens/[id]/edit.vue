<!-- pages/kitchens/[id]/edit.vue -->
<template>
  <client-only>
<pre>chef{{ chef }}</pre>
    <div class="profile-forms">
      <div v-if="kitchen">
        <h3>Edit Kitchen</h3>
        <!-- Edit Form -->
        <OrganismsKitchenEdit v-if="isViewingCreator" />
      </div>
      <div v-else>
        <p class="access-denied-message">
          Access Denied. You are not authorized to edit this kitchen.
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

// Fetch the kitchen document
const kitchenDocRef = computed(() =>
  currentUser.value ? doc(db, "kitchens", route.params.id) : null
);

const { data: kitchen } = useDocument(kitchenDocRef);

// Check if the current user is the creator of the kitchen
const isViewingCreator = computed(() => {
  return kitchen?.value?.added_by === currentUser.value?.uid;
});
</script>
