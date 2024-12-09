<template>
  <div class="cell kitchen-cell">
    <!-- Debugging Kitchen Object -->
    <pre v-if="debugMode">{{ kitchen }}</pre>
    
    <div class="cell-main">
      <!-- Kitchen Image -->
      <div class="cell-avatar">
        <template v-if="imageUrl">
          <img
            :src="imageUrl"
            :alt="kitchen.place_name || 'Kitchen Image'"
            class="kitchen-image"
            loading="lazy"
          />
        </template>
        <template v-else>
          <div class="placeholder-avatar">No Image</div>
        </template>
      </div>

      <!-- Kitchen Information -->
      <div class="cell-info">
        <div class="display-name">{{ kitchen.place_name }}</div>
        <div class="handle">{{ kitchen.formatted_address }}</div>
      </div>
    </div>

    <!-- Team Members -->
    <div v-if="hasTeam" class="team">
      <div class="team-avatars">
        <img
          v-for="(member, index) in displayedTeam"
          :key="member.id || index"
          :src="member.avatar"
          :alt="member.display_name || 'Team Member'"
          class="team-avatar"
          loading="lazy"
        />
        <span v-if="additionalTeamCount > 0">+{{ additionalTeamCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

// Props
const props = defineProps({
  kitchen: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  debugMode: {
    type: Boolean,
    default: false, // Set to `true` to enable debugging
  },
});

// Computed Properties
const imageUrl = computed(() => {
  return props.kitchen.avatar || props.kitchen.avatar_mini || null;
});

const hasTeam = computed(() => Array.isArray(props.kitchen.team) && props.kitchen.team.length > 0);

const displayedTeam = computed(() => {
  return props.kitchen.team ? props.kitchen.team.slice(0, 3) : [];
});

const additionalTeamCount = computed(() => {
  return props.kitchen.team ? Math.max(0, props.kitchen.team.length - 3) : 0;
});
</script>

<style scoped>
.kitchen-cell {
  display: flex;
  flex-direction: column;
  background: var(--background-secondary);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-xs);
  padding: var(--spacing-m);
  gap: var(--spacing-s);
  transition: background-color 0.3s ease;
  width: 100%;
}

.kitchen-cell:hover {
  background-color: var(--background-hover);
}

.cell-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
}

.cell-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--background-light);
}

.placeholder-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  width: 100%;
  height: 100%;
}

.kitchen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cell-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.display-name {
  font-size: var(--font-size-m);
  font-weight: bold;
  color: var(--text-primary);
}

.handle {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}

.team {
  margin-top: var(--spacing-s);
}

.team-avatars {
  display: flex;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  justify-content: flex-start;
}

.team-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--shadow-xs);
}
</style>
