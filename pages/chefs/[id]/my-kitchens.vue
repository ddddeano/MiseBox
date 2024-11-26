<template>
  <client-only>
    <div class="my-kitchens index">
      <h1 class="title">My Kitchens</h1>

      <!-- Check if the user has access -->
      <div v-if="!currentUser" class="missing-acc-message">
        You must be logged in to view this page.
      </div>

      <!-- My Kitchens Section -->
      <section v-else class="my-kitchens-section">
        <h2>Your Kitchens</h2>
        <div v-if="myKitchens?.length" class="kitchen-list">
          <div
            v-for="kitchen in myKitchens"
            :key="kitchen.place_id"
            class="kitchen-card"
          >
            <OrganismsKitchenCard :kitchen="kitchen" />
            <div class="kitchen-actions">
              <button
                @click="deleteKitchen(kitchen)"
                class="btn btn-secondary btn-pill"
              >
                Delete Kitchen
              </button>
              <NuxtLink
                :to="`/kitchens/${kitchen.place_id}`"
                class="btn btn-primary btn-pill"
              >
                View Kitchen
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <p>No kitchens found. Start by creating or connecting to a kitchen!</p>
          <NuxtLink
            to="/kitchens/create-or-connect"
            class="btn btn-primary btn-pill"
          >
            Create or Connect to a Kitchen
          </NuxtLink>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentUser, useFirestore, useCollection } from 'vuefire';
import { query, collection, where } from 'firebase/firestore';

const currentUser = useCurrentUser();
const route = useRoute();
const chefId = route.params.id; // Get chef ID from route

const db = useFirestore();
const { deleteKitchen } = useKitchen();

// Query kitchens associated with the chef
const myKitchensCollectionRef = computed(() =>
  currentUser.value
    ? query(
        collection(db, 'kitchens'),
        where('team', 'array-contains', currentUser.value.uid)
      )
    : null
);
const { data: myKitchens } = useCollection(myKitchensCollectionRef);
</script>

<style scoped>
.my-kitchens {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-m);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-l);
}

.my-kitchens-section {
  width: 100%;
  max-width: 800px;
}

.kitchen-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-m);
  justify-content: center;
}

.kitchen-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.kitchen-actions {
  display: flex;
  gap: var(--spacing-s);
  margin-top: var(--spacing-s);
}

.empty-state {
  text-align: center;
  margin-top: var(--spacing-m);
}
</style>
