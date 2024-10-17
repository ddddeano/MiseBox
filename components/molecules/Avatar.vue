<template>
  <div class="avatar" :class="`avatar--${size}`">
    <!-- Display avatar image if the URL exists and is not empty -->
    <template v-if="user.avatar && user.avatar !== ''">
      <img :src="user.avatar" alt="Avatar" class="avatar-image" />
    </template>

    <!-- Show initials if the avatar URL is empty and initials exist -->
    <template v-else-if="user.initials && user.initials !== ''">
      <span class="avatar-initials">{{ user.initials.toUpperCase() }}</span>
    </template>

    <!-- Display UserCircleIcon as fallback -->
    <template v-else>
      <UserCircleIcon class="avatar-icon" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  user: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped>
.avatar {
  border-radius: var(--radius-full);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--border);
  background-color: var(--background);
}

.avatar--small {
  width: var(--avatar-small);
  height: var(--avatar-small);
}

.avatar--medium {
  width: var(--avatar-medium);
  height: var(--avatar-medium);
}

.avatar--large {
  width: var(--avatar-large);
  height: var(--avatar-large);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials {
  font-size: 1.2rem;
  color: var(--text-primary);
}

.avatar-icon {
  width: 100%;
  height: 100%;
  color: var(--text-secondary); /* Adjust the color to your design */
}
</style>
