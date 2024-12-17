<!-- components/organisms/Kitchen/Cell.vue -->
<template>
  <div class="cell kitchen-cell" v-if="kitchen">
    <!-- Header Section -->
    <NuxtLink
      :to="isDisabled ? null : `/kitchens/${kitchen.kitchenId}`"
      class="cell-header"
      :class="{ disabled: isDisabled }"
    >
      <div class="cell-avatar">
        <MoleculesAvatar :url="imageUrl" size="small" altText="Kitchen Avatar" />
      </div>
      <div class="header-content">
        <div class="name">{{ kitchenName }}</div>
        <div class="location">{{ kitchen.formatted_address }}</div>
      </div>
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Special Section -->
    <div class="special-section" v-if="kitchen.source === 'firestore' && kitchen.team?.length">
      <div class="team">
        <NuxtLink
          v-for="(member, index) in kitchen.team.slice(0, 5)"
          :key="member.id || index"
          :to="`/misebox-users/${member.id}`"
          class="team-member"
        >
          <MoleculesAvatar
            :url="member.avatar_mini || ''"
            size="mini"
            altText="Team Member Avatar"
          />
        </NuxtLink>
        <span v-if="kitchen.team.length > 5">+{{ kitchen.team.length - 5 }}</span>
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
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

// Compute the correct image URL
const imageUrl = computed(() => {
  if (props.kitchen.source === "google") {
    return props.kitchen.photo_url || "/images/default-kitchen.jpg";
  }
  if (props.kitchen.source === "firestore") {
    return props.kitchen.avatar || "/images/default-kitchen.jpg";
  }
  return "/images/default-kitchen.jpg";
});

// Compute the correct kitchen name
const kitchenName = computed(() => {
  if (props.kitchen.source === "google") {
    return props.kitchen.place_name || "Unnamed Kitchen";
  }
  if (props.kitchen.source === "firestore") {
    return props.kitchen.name || "Unnamed Kitchen";
  }
  return "Unnamed Kitchen";
});
</script>

<style scoped>
.team {
  margin-top: var(--spacing-s);
  display: flex;
  flex-direction: row;
}

.team-members {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  overflow-x: auto;
  padding-bottom: var(--spacing-xxs);
}

.team-member {
  border-radius: 50%;
  overflow: hidden;
  width: 24px;
  height: 24px;
}

.team span {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}
</style>
