<template>
  <client-only>
    <div class="index" v-if="currentUser">

      <!-- Display button to create Chef app if the user does not have the app -->
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createChefApp">
          Create Chef App
        </button>
      </div>

      <!-- Chef List -->
      <ul class="chef-list">
        <!-- Current User at the Top -->
        <li v-if="hasApp" class="chef-card-container">
          <NuxtLink :to="`/chefs/${currentUser.uid}`" class="chef-card-link">
            <OrganismsChefUserCard :user="miseboxUser" :isCurrentUser="true" />
          </NuxtLink>
        </li>

        <!-- List of Other Chefs -->
        <li v-for="chef in filteredChefs" :key="chef.id" class="chef-card-container">
          <NuxtLink :to="`/chefs/${chef.id}`" class="chef-card-link">
            <OrganismsChefUserCard :user="chef" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useFirestore } from 'vuefire'; // Importing useCurrentUser
import { collection } from 'firebase/firestore';

// Get the current user and Firestore instance
const currentUser = useCurrentUser();
const db = useFirestore();

// Reference the 'chefs' collection in Firestore
const collectionRef = collection(db, 'chefs');

// Use the `useMiseboxUser` composable to get the current user's document
const { miseboxUser } = useMiseboxUser(currentUser);

// Use the `useChef` composable to manage Chef-specific functionality
const { createChef } = useChef(currentUser);

// Fetch and filter the chefs collection
const { filteredCollection: filteredChefs } = useFilteredCollection(collectionRef);

// Use the `useHasApp` composable to check if the user has the Chef app
const { hasApp } = useHasApp(miseboxUser, 'chefs');

// Function to handle creating a new Chef profile
const createChefApp = async () => {
  await createChef();
};
</script>

<style scoped>
.index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.create-app-container {
  margin-bottom: 20px;
}

.create-app-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-app-button:hover {
  background-color: #0056b3;
}

.chef-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.chef-card-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.chef-card-link {
  display: block;
  width: 100%;
  max-width: 600px;
  text-decoration: none;
  color: inherit;
}

.chef-card-container > * {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
