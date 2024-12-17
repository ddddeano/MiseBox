<!-- components/organisms/Kitchen/Card.vue -->
<template>
  <div class="card kitchen-card" v-if="kitchen">
    <!-- Optional Debug: show entire kitchen object -->

    <!-- Header Section: Avatar & Basic Info -->
    <div class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="imageUrl" size="medium" altText="Kitchen Avatar" />
      </div>
      <div class="header-content">
        <h2 class="kitchen-name">{{ kitchen.name || "Unnamed Kitchen" }}</h2>
        <p class="address">{{ kitchen.formatted_address }}</p>
        <p class="location" v-if="locationString">{{ locationString }}</p>
      </div>
    </div>

    <!-- Additional Info Section -->
    <div class="card-info">
      <p class="kitchen-id">
        <strong>ID:</strong> {{ kitchen.kitchenId }}
      </p>
      <p class="created-at">
        <strong>Created:</strong> {{ kitchen.created_at }}
      </p>
      <p class="added-by" v-if="kitchen.added_by">
        <strong>Added By:</strong> {{ kitchen.added_by }}
      </p>
      <p v-if="kitchen.google_places_id">
        <strong>Google Places ID:</strong> {{ kitchen.google_places_id }}
      </p>
    </div>

    <!-- Team Section -->
    <div class="team" v-if="kitchen.team && kitchen.team.length">
      <h3>Team Members ({{ kitchen.team.length }})</h3>
      <div class="team-members">
        <div
          v-for="(member, index) in kitchen.team.slice(0, 5)"
          :key="member.id || index"
          class="team-member"
        >
          <MoleculesAvatar
            :url="member.avatar"
            size="mini"
            altText="Team Member Avatar"
          />
        </div>
        <!-- Show a small indicator if there's more than 5 team members -->
        <span v-if="kitchen.team.length > 5">
          +{{ kitchen.team.length - 5 }} more
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});

/**
 * Compute the best image URL for the kitchen.
 * 1. Prefer `avatar` from Firestore.
 * 2. Fallback to `avatar_mini` if `avatar` is not present.
 * 3. Lastly fallback to a default image.
 */
const imageUrl = computed(() => {
  return props.kitchen.avatar || props.kitchen.avatar_mini || "/images/default-kitchen.jpg";
});

/**
 * Compute a location string from city, region, and country if provided.
 */
const locationString = computed(() => {
  const locParts = [];
  if (props.kitchen.city) locParts.push(props.kitchen.city);
  if (props.kitchen.region) locParts.push(props.kitchen.region);
  if (props.kitchen.country) locParts.push(props.kitchen.country);
  return locParts.join(", ");
});
</script>

<style scoped>
.kitchen-card {
  border-radius: var(--radius-m);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-m);
  overflow: hidden;
  background-color: var(--background-1);
  padding: var(--spacing-s);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-s);
}

.card-avatar {
  flex-shrink: 0;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.kitchen-name {
  font-size: var(--font-size-m);
  font-weight: bold;
  margin: 0;
}

.address,
.location {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin: 0;
}

.card-info {
  margin-top: var(--spacing-s);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: var(--font-size-s);
  color: var(--text-primary);
}

.team {
  margin-top: var(--spacing-s);
}

.team-members {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.team-member {
  border-radius: 50%;
  overflow: hidden;
  width: 24px;
  height: 24px;
}
</style>
