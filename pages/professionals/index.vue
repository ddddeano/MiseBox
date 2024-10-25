<!-- Professional Page -->
<template>
  <client-only>
    <div class="index" v-if="currentUser && professional">
      <!-- If the user doesn't have the professional app, show the "Join Professional Network" button -->
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createProfessionalUser">
          Join Professional Network!
        </button>
      </div>
      
      <!-- If the user has the app, show the professional card -->
      <ul class="collection">
        <li v-if="hasApp" class="card-container">
          <OrganismsProfessionalCard :professional="professional" class="current-card" />
        </li>
        
        <!-- List all professionals fetched from Firestore -->
        <li v-for="professionalItem in professionals" :key="professionalItem.id" class="filtered-collection-container">
          <OrganismsProfessionalCell
            :professional="professionalItem"
            :isFollowing="miseboxUser.following?.includes(professionalItem.id) ? true : false"
          />
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser, useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

// Get the current authenticated user
const currentUser = useCurrentUser()

// Access Firestore instance
const firestore = useFirestore()

// Fetch the miseboxUser based on the currentUser
const { miseboxUser } = useMiseboxUser(currentUser)

// Fetch the professional profile linked to the miseboxUser
const { createProfessionalUser, professional } = useProfessional(miseboxUser)

// Fetch the collection of all professionals from Firestore
const professionalsRef = collection(firestore, 'professionals')
const { data: professionals } = useCollection(professionalsRef)

// Check if the user has joined the professional app
const { hasApp } = useHasApp(miseboxUser, 'professionals')
</script>

