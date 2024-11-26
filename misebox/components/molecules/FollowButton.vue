<template>
  <div>
    <!-- Follow Button with HeartIcon and click event -->
    <HeartIcon :class="['icon', isFollowingClass, { 'clicked': isClicked }]" @click="toggleFollow" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

// Firestore instance and current user
const firestore = useFirestore()
const currentUser = useCurrentUser()

// Props to receive the user object and initial following status
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: Boolean,
    default: false,  // Default to not following
  },
})

// Local state to keep track of follow status
const localFollowingStatus = ref(props.isFollowing)
const isClicked = ref(false) // To manage the click animation

// Computed class for the Heart icon color based on follow status
const isFollowingClass = computed(() => {
  return localFollowingStatus.value ? 'following' : 'not-following'
})

// Function to toggle follow/unfollow in Firestore
const toggleFollow = async () => {
  try {
    const currentUserId = currentUser.value.uid
    const followedUserId = props.user.id

    // Reference to the current user's Firestore document
    const currentUserDocRef = doc(firestore, 'misebox-users', currentUserId)

    // Toggle follow/unfollow logic
    const newFollowingStatus = !localFollowingStatus.value

    // Update the following array based on the new status
    const updatedFollowingList = newFollowingStatus
      ? arrayUnion(followedUserId)  // Add to following list
      : arrayRemove(followedUserId) // Remove from following list

    // Update Firestore with the new following status
    await updateDoc(currentUserDocRef, {
      following: updatedFollowingList,
    })

    // Update the local follow status
    localFollowingStatus.value = newFollowingStatus

    // Trigger the click animation
    isClicked.value = true
    setTimeout(() => {
      isClicked.value = false
    }, 300)

    console.log(`User ${newFollowingStatus ? 'followed' : 'unfollowed'} successfully`)
  } catch (err) {
    console.error('Error updating follow status:', err)
  }
}
</script>

<style scoped>
.icon {
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.following {
  color: var(--error); /* Color when following */
}

.not-following {
  color: var(--background-strong); /* Color when not following */
}

/* Add a pulse-like scale animation when clicked */
.clicked {
  transform: scale(1.3); /* Pulse effect on click */
  transition: transform 0.2s ease-out;
}

.clicked:active {
  transform: scale(0.9); /* Slight shrink on active press */
}
</style>
