<template>
  <div v-if="fetchedMiseboxUser" class="profile-header">
    <!-- Avatar -->
    <MoleculesAvatar :user="fetchedMiseboxUser" size="large" />

    <!-- Display Name and Handle -->
    <h1 class="display-name">{{ fetchedMiseboxUser.display_name || 'Anonymous' }}</h1>
    <p class="handle" v-if="fetchedMiseboxUser.handle">{{ fetchedMiseboxUser.handle }}</p>

    <!-- Follow Button: Only show if not viewing own profile -->
    <MoleculesFollowButton
      v-if="!isViewingOwnRoute"
      :user="fetchedMiseboxUser"
      :isFollowing="isFollowing"
      class="follow-button"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
  fetchedMiseboxUser: {
    type: Object,
    required: true,
  },
});

// Use the interaction composable to get ownership and follow status
const { isViewingOwnRoute, isFollowing } = useInteraction(props.fetchedMiseboxUser.id);
</script>

<style scoped>
/* Scoped Styles */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background-color: var(--background-1);
  border-radius: var(--radius-s);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.display-name {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin: 0.5rem 0;
}

.handle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.follow-button {
  margin-top: 1rem;
}
</style>
