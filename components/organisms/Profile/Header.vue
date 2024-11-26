<template>
  <div v-if="fetchedMiseboxUser" class="profile-header">
    <MoleculesAvatar :user="fetchedMiseboxUser" size="large" />
    <h1 class="display-name">{{ fetchedMiseboxUser.display_name || 'Anonymous' }}</h1>
    <p class="handle" v-if="fetchedMiseboxUser.handle">{{ fetchedMiseboxUser.handle }}</p>

    <!-- Follow Button: Only show if not the current user's profile -->
    <div v-if="!isCurrentUser" class="follow-button">
      <MoleculesFollowButton :user="fetchedMiseboxUser" :isFollowing="isFollowing" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCurrentUser } from 'vuefire'
import { defineProps } from 'vue'

const props = defineProps({
  fetchedMiseboxUser: {
    type: Object,
    default: () => ({}), // Default to an empty object to prevent undefined errors
  },
  isCurrentUser: {
    type: Boolean,
    required: true,
  },
})

const currentUser = useCurrentUser()
const { miseboxUser } = useMiseboxUser(currentUser)

// Check if the current user is following this profile
const isFollowing = computed(() => {
  return miseboxUser.value?.following?.includes(props.fetchedMiseboxUser?.id) || false
})
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: var(--spacing-l);
  border-radius: var(--radius-m);
  margin-bottom: var(--spacing-s);
}

.display-name {
  margin-top: var(--spacing-s);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.handle {
  color: var(--text-secondary);
  font-size: var(--font-size-m);
}

.follow-button {
  margin-top: var(--spacing-m);
  align-self: flex-start;
}
</style>
