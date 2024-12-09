<!-- components/Organisms/Misebox/Card.vue -->
<template>
  <div class="card misebox-card" v-if="miseboxUser">
    <!-- User Information -->
    <NuxtLink :to="`/misebox-users/${miseboxUser.id}`" class="view-profile-link">
      <div class="card-header">
        <MoleculesAvatar :user="miseboxUser" size="small" />
        <div class="user-info">
          <p class="display-name">{{ miseboxUser.display_name }}</p>
          <p class="handle">{{ miseboxUser.handle }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Additional Information -->
    <div v-if="miseboxUser.bio" class="card-expanded">
      <p class="bio">{{ miseboxUser.bio }}</p>
    </div>
  </div>
</template>

<script setup>
import { useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

const miseboxUserDocRef = computed(() =>
  currentUser.value ? doc(db, "misebox-users", currentUser.value.uid) : null
);
const { data: miseboxUser } = useDocument(miseboxUserDocRef);
</script>
