<template>
  <client-only>
    <div class="chef-index index">
      <!-- Check if the user has a Vuefire account -->
      <div v-if="!currentUser" class="missing-acc-message">
        You first need a Vuefire account.
      </div>

      <!-- Check if the user has a Misebox account -->
      <div v-if="!miseboxUser" class="missing-acc-message">
        You first need a Misebox account.
      </div>

      <!-- Show "Join Chef" section if the user doesn't have a chef profile -->
      <div v-if="!chef" class="create-app-container">
        <OrganismsSharedJoinCallToAction type="chef" :onJoinClick="createChef" />
      </div>

      <!-- Show current user's chef profile card -->
      <ul v-else class="collection">
        <li class="card-container">
          <OrganismsChefCard :chef="chef" />
        </li>

        <!-- Show list of other chefs -->
        <li v-for="otherChef in chefs" :key="otherChef.id" class="collection-container">
          <OrganismsChefCell :chef="otherChef" />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useCollection, useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

// Fetch the current user's Misebox account
const currentUser = useCurrentUser();
const db = useFirestore();
const { currentMiseboxUser: miseboxUser } = useMiseboxUser();

// Fetch the current user's chef profile
const { currentChef: chef, createChef } = useChef();

// Fetch the collection of all Chef profiles
const chefsCollectionRef = computed(() =>
  currentUser.value ? collection(db, 'chefs') : null
);

const { data: chefs } = useCollection(chefsCollectionRef);
</script>
