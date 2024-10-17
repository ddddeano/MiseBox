<template>
  <client-only>
    <div class="index" v-if="currentUser?.uid">
      <div v-if="hasApp">
        <NuxtLink :to="`/kitchens/${currentUser.uid}`">
          <SubKitchenCard :uid="currentUser.uid" />
        </NuxtLink>
      </div>

      <div v-else>
        <button @click="createKitchenApp">Create Kitchen App</button>
      </div>

      <div class="all-kitchens" v-if="filteredKitchens.length > 0">
        <h2>All Kitchens</h2>
        <ul>
          <li v-for="kitchen in filteredKitchens" :key="kitchen.id">
            <NuxtLink :to="`/kitchens/${kitchen.id}`">
              <SubKitchenCard :uid="kitchen.id" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Loading user data...</p>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useFirestore, useDocument, useCollection } from 'vuefire';
import { doc, collection } from 'firebase/firestore';

const currentUser = useCurrentUser();
const db = useFirestore();
const userDocRef = computed(() =>
  currentUser.value ? doc(db, 'misebox-users', currentUser.value.uid) : null
);
const { data: miseboxUserDoc } = useDocument(userDocRef);

const hasApp = computed(() => {
  return Array.isArray(miseboxUserDoc.value?.user_apps) && miseboxUserDoc.value.user_apps.includes('kitchen');
});

const kitchensCollection = collection(db, 'kitchens');
const { data: kitchens } = useCollection(kitchensCollection);

const filteredKitchens = computed(() => {
  return kitchens.value?.filter(kitchen => kitchen.id !== currentUser.value?.uid) || [];
});

const createKitchenApp = () => {
  if (miseboxUserDoc.value) {
    createKitchen(miseboxUserDoc.value);
  }
};
</script>
