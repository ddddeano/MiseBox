<template>
  <client-only>
    <div class="index" v-if="currentUser && miseboxUser">
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createMiseboxUser">Join Misebox!</button>
      </div>
      <ul class="collection">
        <li v-if="hasApp" class="card-container">
          <OrganismsMiseboxUserCard :user="miseboxUser" class="current-card"/>
        </li>
        <li v-for="user in filteredUsers" :key="user.id" class="filtered-collection-container">
          <OrganismsMiseboxUserCell
            :user="user"
            :isFollowing="miseboxUser.following?.includes(user.id) ? true : false"
          />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useFirestore, useCurrentUser } from 'vuefire'
import { collection } from 'firebase/firestore'

const currentUser = useCurrentUser()
const collectionRef = collection(useFirestore(), 'misebox-users')

const { createMiseboxUser, miseboxUser } = useMiseboxUser(currentUser)
const { filteredCollection: filteredUsers } = useFilteredCollection(collectionRef)
const { hasApp } = useHasApp(miseboxUser, 'misebox-users')
</script>

