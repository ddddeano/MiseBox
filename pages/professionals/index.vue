<template>
  <client-only>
    <div class="professional-index index">
      <!-- Check if the user has a Vuefire account -->
      <div v-if="!currentUser" class="missing-acc-message">
        You first need a Vuefire account.
      </div>

      <!-- Check if the user has a Misebox account -->
      <div v-if="!miseboxUser" class="missing-acc-message">
        You first need a Misebox account.
      </div>

      <!-- Show "Join Professional" section if the user doesn't have a professional profile -->
      <div v-if="!professional" class="create-app-container">
        <OrganismsSharedJoinCallToAction
          type="professional"
          :onJoinClick="createProfessional"
        />
      </div>

      <!-- Show current user's professional profile card -->
      <ul v-else class="collection">
        <li class="card-container">
          <OrganismsProfessionalCard :professional="professional" />
        </li>

        <!-- Show list of other professionals -->
        <li
          v-for="otherProfessional in professionals"
          :key="otherProfessional.id"
          class="collection-container"
        >
          <OrganismsProfessionalCell :professional="otherProfessional" />
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

// Fetch the current user's professional profile
const { currentProfessional: professional, createProfessional } = useProfessional();

// Fetch the collection of all Professional profiles
const professionalsCollectionRef = computed(() =>
  currentUser.value ? collection(db, 'professionals') : null
);

const { data: professionals } = useCollection(professionalsCollectionRef);
</script>
