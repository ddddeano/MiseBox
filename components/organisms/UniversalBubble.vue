<!-- components/organisms/UniversalBubble.vue -->
<template>
  <div class="profile-bubbles-container">
    <div
      v-for="app in filteredApps"
      :key="app"
      class="profile-bubble"
    >
      <div class="bubble-content">
        <p class="app-label">{{ generateLabel(app) }}</p>

        <!-- Navigation Links -->
        <NuxtLink
          :to="`/${app}/${id}`"
          class="profile-link"
        >
          View {{ generateLabel(app) }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props for ID, parent (current app), and user's apps
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    default: null, // Current app to exclude
  },
  userApps: {
    type: Array,
    default: () => [], // Provide a default empty array
  },
});

// Filter out the current app (parent)
const filteredApps = computed(() =>
  props.userApps.filter((app) => app !== props.parent)
);

// Function to dynamically generate app labels
const generateLabel = (app) => {
  const titleCased = app
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `${titleCased} Profile`;
};
</script>

<style scoped>
.profile-bubbles-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-s);
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-m);
}

.profile-bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 120px;
  background-color: var(--background-2);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.profile-bubble:hover {
  transform: scale(1.05);
}

.bubble-content {
  text-align: center;
}

.app-label {
  font-size: var(--font-size-m);
  font-weight: bold;
}

.profile-link {
  text-decoration: none;
  color: var(--text-primary);
}

.profile-link:hover {
  color: var(--hover);
}
</style>
