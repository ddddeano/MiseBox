<template>
  <client-only>
    <div class="index" v-if="currentUser && chef">
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createChef">
          Create Chef Profile
        </button>
      </div>
      <ul class="collection">
        <li v-if="hasApp" class="card-container">
          <OrganismsChefCard :chef="chef" class="current-card" />
        </li>
        <li v-for="chef in filteredChefs" :key="chef.id" class="filtered-collection-container">
          <OrganismsChefCell
           :chef="chef"
           :isFollowing="miseboxUser.following?.includes(chef.id) ? true : false"
           />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'

const currentUser = useCurrentUser()
const collectionRef = collection(useFirestore(), 'chefs')

// Fetch miseboxUser instead of using currentUser directly
const { miseboxUser } = useMiseboxUser(currentUser)

// Pass miseboxUser to useChef
const { createChef, chef } = useChef(miseboxUser)
const { filteredCollection: filteredChefs } = useFilteredCollection(collectionRef)
const { hasApp } = useHasApp(miseboxUser, 'chefs')
</script>
