<template>
  <div class="user-cell-container">
    <!-- Main Wrapper with Flexbox for alignment -->
    <div class="user-cell-row">
      <!-- Avatar and Info wrapped in a link to the user profile -->
      <div class="user-avatar-info">
        <NuxtLink :to="`/misebox-users/${user.id}`" class="view-profile-link">
          <MoleculesAvatar :user="user" size="small" />
          <div class="user-info">
            <div class="display-name">{{ user.display_name }}</div>
            <div class="handle">@{{ user.handle }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Follow Button on Right -->
      <MoleculesFollowButton
        v-if="isFollowing !== 'hide'"
        :isFollowing="isFollowing === 'true'"
        :user="user"
      />
    </div>
  </div>
</template>

<script setup>
// Props for the user and follow status
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isFollowing: {
    type: String,
    default: 'false',
    validator: (value) => ['true', 'false', 'hide'].includes(value),
  },
})
</script>

<style scoped>
.user-cell-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-s);
  color: var(--text-primary);

}

.user-cell-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-avatar-info {
  display: flex;
  align-items: center;
}

.user-info {
  margin-left: var(--spacing-s);
}

.display-name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.handle {
  font-size: var(--font-size-s);
  margin: 0;
}

/* Styling for the follow button */
.pin {
  margin-left: auto; /* Align the Follow Button to the far right */
}

/* Link styling */
.view-profile-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit; /* Ensures that the link doesn't have default link colors */
}
</style>
