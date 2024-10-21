<template>
  <div class="cell user-cell">
    <!-- Main Wrapper with Flexbox for alignment -->
    <div class="cell-row">
      <!-- Avatar and Info wrapped in a link to the user profile -->
      <div class="cell-avatar">
        <NuxtLink :to="`/misebox-users/${user.id}`" class="view-profile-link">
          <MoleculesAvatar :user="user" size="small" />
          <div class="cell-info">
            <div class="display-name">{{ user.display_name }}</div>
            <div class="handle">{{ user.handle }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Follow Button on Right, hidden if user is current user -->
      <MoleculesFollowButton
        v-if="!isCurrentUser && showFollowButton"
        :isFollowing="isFollowing"
        :user="user"
      />
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'

// Get the current user
const currentUser = useCurrentUser()

// Props for the user and follow status
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: Boolean,
    default: false,
  },
})

// Computed property to check if the user being displayed is the current user
const isCurrentUser = computed(() => currentUser.value?.uid === props.user.id)

// Show follow button if the user is not hidden and not the current user
const showFollowButton = computed(() => !isCurrentUser.value)
</script>
