<template>
  <client-only>
    <div class="kitchens-index index">
      <!-- Authentication and Profile Checks -->
      <div v-if="!currentUser" class="missing-acc-message">
        You first need a Vuefire account.
      </div>
      <div v-if="!miseboxUser" class="missing-acc-message">
        You first need a Misebox account.
      </div>
      <div v-if="!chef" class="missing-acc-message">
        You first need a Chef profile to manage kitchens.
      </div>
     <!-- Segue to Create or Connect a Kitchen -->
     <section v-if="chef" class="create-or-connect-kitchen-section">
        <h2>Create or Connect to a Kitchen</h2>
        <NuxtLink to="/kitchens/create-or-connect" class="btn btn-primary btn-pill">
          Go to Create or Connect
        </NuxtLink>
      </section>
      <!-- My Kitchens Section -->
      <section v-if="chef && myKitchens?.length" class="my-kitchens-section">
        <h2>My Kitchens</h2>
        <div class="kitchen-list">
          <OrganismsKitchenCard
            v-for="kitchen in myKitchens"
            :key="kitchen.place_id"
            :kitchen="kitchen"
          />
        </div>
      </section>

      <!-- All Kitchens Section -->
      <section v-if="currentUser && miseboxUser" class="all-kitchens-section">
        <h2>All Kitchens</h2>
        <div class="kitchen-list">
          <OrganismsKitchenCard
            v-for="kitchen in allKitchens"
            :key="kitchen.place_id"
            :kitchen="kitchen"
          />
        </div>
      </section>

    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useCollection, useFirestore } from 'vuefire';
import { collection, query, where } from 'firebase/firestore';

// Get the current user and Firestore instance
const currentUser = useCurrentUser();
const db = useFirestore();

// Mocking miseboxUser and chef for this example
const miseboxUser = ref(true);
const chef = ref(true);

// Query kitchens connected to the current chef (My Kitchens)
const myKitchensCollectionRef = computed(() =>
  currentUser.value && chef.value
    ? query(
        collection(db, 'kitchens'),
        where('team', 'array-contains', currentUser.value.uid)
      )
    : null
);
const { data: myKitchens } = useCollection(myKitchensCollectionRef);

// Query all kitchens in the database
const allKitchensCollectionRef = computed(() =>
  currentUser.value ? collection(db, 'kitchens') : null
);
const { data: allKitchens } = useCollection(allKitchensCollectionRef);
</script>
