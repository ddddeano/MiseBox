<template>
  <client-only>
    <div class="index" v-if="currentUser && professional">
      <div v-if="!hasApp" class="create-app-container">
        <button class="create-app-button" @click="createProfessional">
          Join Professional Network!
        </button>
      </div>
      <ul class="collection">
        <li v-if="hasApp" class="card-container">
          <OrganismsProfessionalCard :professional="professional" class="current-card" />
        </li>
        <li v-for="professional in filteredProfessionals" :key="professional.id" class="filtered-collection-container">
          <OrganismsProfessionalCell
            :professional="professional"
            :isFollowing="miseboxUser.following?.includes(professional.id) ? true : false"
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
const collectionRef = collection(useFirestore(), 'professionals')

// Fetch miseboxUser instead of using currentUser directly
const { miseboxUser } = useMiseboxUser(currentUser)

// Pass miseboxUser to useProfessional
const { createProfessionalUser, professional } = useProfessional(miseboxUser)
const { filteredCollection: filteredProfessionals } = useFilteredCollection(collectionRef)
const { hasApp } = useHasApp(miseboxUser, 'professionals')
</script>
