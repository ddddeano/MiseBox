<template>
  <div class="profile-bubbles-container">
    <div
      v-for="entity in filteredEntities"
      :key="entity.collection"
      class="profile-bubble"
    >
      <div class="bubble-content">
        <p class="app-label">{{ entity.label }}</p>

        <!-- Display appropriate button or message -->
        <NuxtLink
          v-if="profileStates[entity.collection]"
          :to="`/${entity.collection}/${id}`"
          class="profile-link"
        >
          View Profile
        </NuxtLink>
        <NuxtLink
          v-else-if="isViewingOwnProfile"
          :to="`/${entity.collection}/${id}/edit`"
          class="profile-link"
        >
          Create/Edit Profile
        </NuxtLink>
        <p v-else>No Profile Found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCurrentUser, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    default: null, // The parent collection to exclude
  },
});

const db = useFirestore();
const currentUser = useCurrentUser();

// Define the entities to query
const entities = [
  {
    collection: 'misebox-users',
    label: 'Misebox User Profile',
  },
  {
    collection: 'professionals',
    label: 'Professional Profile',
  },
  {
    collection: 'chefs',
    label: 'Chef Profile',
  },
];

// Exclude the parent entity from the list
const filteredEntities = computed(() =>
  entities.filter((entity) => entity.collection !== props.parent)
);

// Create reactive states for each entity
const profileStates = ref(
  entities.reduce((states, entity) => {
    states[entity.collection] = false;
    return states;
  }, {})
);

// Fetch profiles for all entities
filteredEntities.value.forEach((entity) => {
  const docRef = doc(db, entity.collection, props.id);
  const { data } = useDocument(docRef);

  // Watch for changes in data and update profileStates
  watch(
    () => data.value,
    (newValue) => {
      profileStates.value[entity.collection] = !!newValue;
    },
    { immediate: true }
  );
});

// Determine if the current user is viewing their own profile
const isViewingOwnProfile = computed(() => {
  return currentUser.value && currentUser.value.uid === props.id;
});
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

p {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}
</style>
