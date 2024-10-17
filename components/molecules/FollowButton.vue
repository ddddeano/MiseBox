<template>
  <div>
    <!-- Follow Button with HeartIcon and click event -->
    <HeartIcon :class="isFollowingClass" class="icon" @click="toggleFollow" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { updateDoc, doc, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore'
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
    // Reference to the followed user's Firestore document
    const followedUserDocRef = doc(firestore, 'misebox-users', followedUserId)

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

    // If it's a new follow, add a notification for the followed user
    if (newFollowingStatus) {
      const notification = {
        msg: 'You have a new follower!',
        subject: currentUserId, // The follower (current user)
        createdAt: serverTimestamp(),
        read: false
      }

      // Update the followed user's notifications array
      await updateDoc(followedUserDocRef, {
        notifications: arrayUnion(notification)
      })
    }

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
}

.following {
  color: var(--error); /* Color when following */
}

.not-following {
  color: var(--text-caption)
}
</style>
