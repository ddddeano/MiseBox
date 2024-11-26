<template>
  <client-only>
    <div class="index">
      <!-- Check if the user has a Vuefire account -->
      <div v-if="!currentUser" class="missing-acc-message">
        You first need a Vuefire account.
      </div>

      <!-- Show "Join Misebox" section if the user doesn't have a profile -->
      <div v-if="!miseboxUser" class="create-app-container">
        <OrganismsSharedJoinCallToAction type="misebox" :onJoinClick="createMiseboxUser" />
      </div>

      <!-- Show the current user's card -->
      <ul v-if="miseboxUser" class="collection">
        <li class="card-container">
          <OrganismsMiseboxUserCard :miseboxUser="miseboxUser" class="current-card" />
        </li>

        <!-- Show list of other users -->
        <li
          v-for="user in miseboxUsers"
          :key="user.id"
          class="collection-container"
        >
          <OrganismsMiseboxUserCell :miseboxUser="user" />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

const currentUser = useCurrentUser();
const db = useFirestore();

// Fetch the current Misebox user profile
const { currentMiseboxUser: miseboxUser, createMiseboxUser } = useMiseboxUser();

// Fetch the collection of all Misebox users
const miseboxUsersCollectionRef = computed(() =>
  currentUser.value ? collection(db, 'misebox-users') : null
);

const { data: miseboxUsers } = useCollection(miseboxUsersCollectionRef);
</script>
