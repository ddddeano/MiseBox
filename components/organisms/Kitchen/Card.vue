<!-- components/Organisms/Kitchen/Card.vue -->
<template>
  <div class="card kitchen-card" v-if="kitchen">
    <!-- Clickable Link to Kitchen Profile -->
    <NuxtLink :to="`/kitchens/${kitchen.place_id}`" class="view-kitchen-link">
      <div class="card-header">
        <img
          :src="kitchen.photo_url || defaultPhotoUrl"
          alt="Kitchen Image"
          class="kitchen-image"
        />
        <div class="kitchen-info">
          <p class="name">{{ kitchen.place_name }}</p>
          <p class="location">{{ kitchen.formatted_address }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expanded Content -->
    <div class="card-expanded">
      <p class="description" v-if="kitchen.description">
        {{ kitchen.description }}
      </p>
      <p class="team" v-if="kitchen.team?.length">
        Team Members: {{ kitchen.team.length }}
      </p>
      <p class="added-by" v-if="kitchen.added_by">
        Added by: {{ kitchen.added_by }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDocument } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

const db = useFirestore();

// State for expanding the card (if needed in the future)
const expanded = ref(false);
const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

// Fetch Kitchen data
const kitchenDocRef = computed(() =>
  doc(db, "kitchens", "kitchen-id-placeholder") // Replace placeholder with actual logic for ID
);
const { data: kitchen } = useDocument(kitchenDocRef);

// Default photo URL
const defaultPhotoUrl = "/images/default-kitchen.png";
</script>

<style scoped>
.kitchen-card {
  overflow: hidden;
  transition: transform 0.3s;
}

.kitchen-card:hover {
  transform: scale(1.02);
}

.view-kitchen-link {
  text-decoration: none;
  color: inherit;
}

.card-header {
  display: flex;
  align-items: center;
  padding: var(--spacing-medium);
  background-color: var(--background-color);
}

.kitchen-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: var(--spacing-small);
}

.kitchen-info {
  flex: 1;
}

.name {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}

.location {
  font-size: var(--font-size-small);
  color: var(--text-muted-color);
}

.card-expanded {
  padding: var(--spacing-medium);
  background-color: var(--background-light-color);
}

.description {
  margin-bottom: var(--spacing-small);
}

.team,
.added-by {
  font-size: var(--font-size-small);
  color: var(--text-muted-color);
}
</style>
