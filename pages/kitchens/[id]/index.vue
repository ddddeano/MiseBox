<template>
  <client-only>
    <div v-if="kitchen" class="kitchen-profile-index">
      <div class="kitchen-header">
        <h1 class="kitchen-name">{{ kitchen.place_name }}</h1>
        <p class="kitchen-location">{{ kitchen.city }}, {{ kitchen.country }}</p>
        <div class="kitchen-photo" v-if="kitchen.photo_url">
          <img :src="kitchen.photo_url" alt="Kitchen Photo" />
        </div>
      </div>

      <!-- Toggle Buttons -->
      <div class="toggle-buttons">
        <button
          class="btn btn-secondary btn-pill"
          :class="{ active: viewMode === 'ingredients' }"
          @click="viewMode = 'ingredients'"
        >
          Ingredients
        </button>
        <button
          class="btn btn-secondary btn-pill"
          :class="{ active: viewMode === 'tasks' }"
          @click="viewMode = 'tasks'"
        >
          Tasks
        </button>
      </div>

      <!-- Dynamic Sections -->
      <div v-if="viewMode === 'ingredients'">
        <OrganismsKitchenIngredientList :kitchenDocRef="kitchenDocRef" :kitchenId="route.params.id" />
      </div>
      <div v-else-if="viewMode === 'tasks'">
        <OrganismsKitchenTaskList :kitchenDocRef="kitchenDocRef" :kitchenId="route.params.id" />
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <NuxtLink
          :to="`/kitchens/${route.params.id}/create-order`"
          class="btn btn-primary btn-pill"
        >
          Create Order
        </NuxtLink>
        <NuxtLink
          :to="`/kitchens/${route.params.id}/create-todo`"
          class="btn btn-primary btn-pill"
        >
          Create Todo List
        </NuxtLink>
      </div>
    </div>

    <!-- Loading and Auth Links -->
    <div v-else>
      <p class="shared-view-profile-loading">Loading...</p>
      <NuxtLink v-if="!currentUser" to="/auth" class="btn btn-primary btn-pill">
        Go to Auth
      </NuxtLink>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentUser, useDocument } from 'vuefire';
import { doc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const currentUser = useCurrentUser();
const route = useRoute();
const db = useFirestore();

const kitchenDocRef = computed(() =>
  currentUser.value && route.params.id ? doc(db, 'kitchens', route.params.id) : null
);

const { data: kitchen } = useDocument(kitchenDocRef);

// Toggle between "ingredients" and "tasks"
const viewMode = ref('ingredients');
</script>

<style scoped>
.kitchen-profile-index {
  padding: var(--spacing-m);
}

.kitchen-header {
  text-align: center;
  margin-bottom: var(--spacing-m);
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-s);
  margin-bottom: var(--spacing-m);
}

.toggle-buttons .btn {
  padding: var(--spacing-s) var(--spacing-m);
}

.toggle-buttons .btn.active {
  background-color: var(--primary);
  color: white;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-m);
  margin-top: var(--spacing-m);
}

.action-buttons .btn {
  flex: 1;
  max-width: 200px;
}
</style>
