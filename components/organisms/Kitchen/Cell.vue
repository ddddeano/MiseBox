<!-- components/organisms/Kitchen/Cell.vue -->
<template>
  <div
    class="cell kitchen-cell"
    :class="{ 'in-firestore': kitchen.source === 'firestore' }"
    v-if="kitchen"
  >
    <!-- Header Section -->
    <NuxtLink
      v-if="!isDisabled"
      :to="`/kitchens/${kitchen.id}`"
      class="cell-header"
    >
      <!-- Avatar Section -->
      <div v-if="kitchen.photo_url || kitchen.avatar" class="cell-avatar">
        <MoleculesAvatar :url="kitchen.photo_url || kitchen.avatar" size="small" altText="Kitchen Avatar" />
      </div>
      <!-- Header Content -->
      <div class="header-content">
        <div class="title">{{ kitchenDisplayName }}</div>
        <div class="subtitle">{{ kitchenLocation }}</div>
      </div>
      <!-- Navigation Icon -->
      <div class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>

    <!-- Disabled Link (Visual Only) -->
    <div v-else class="cell-header">
      <div v-if="kitchen.photo_url || kitchen.avatar" class="cell-avatar">
        <MoleculesAvatar :url="kitchen.photo_url || kitchen.avatar" size="small" altText="Kitchen Avatar" />
      </div>
      <div class="header-content">
        <div class="title">{{ kitchenDisplayName }}</div>
        <div class="subtitle">{{ kitchenLocation }}</div>
      </div>
    </div>

    <!-- Team Section -->
    <section class="team-section" v-if="miseboxUsers?.length">
      <div class="team-list">
        <div
          v-for="(member, index) in miseboxUsers.slice(0, 5)"
          :key="member.id || index"
          class="team-member"
        >
          <MoleculesAvatar :url="member.avatar || ''" size="mini" :altText="member.display_name || 'Team Member'" />
        </div>
        <span v-if="miseboxUsers.length > 5" class="team-count">
          +{{ miseboxUsers.length - 5 }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirestore } from "vuefire";

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

// Firebase Firestore instance
const db = useFirestore();

// Compute the display name for the kitchen
const kitchenDisplayName = computed(() => {
  return props.kitchen.place_name || props.kitchen.name || "Unnamed Kitchen";
});

// Compute the kitchen location for display
const kitchenLocation = computed(() => {
  const { city, region, country, formatted_address } = props.kitchen;
  return formatted_address || [city, region, country].filter(Boolean).join(", ") || "Location Unknown";
});

// Fetch team members from "misebox-users" collection
const miseboxUsers = ref([]);
if (props.kitchen.current_team?.length) {
  const fetchTeam = async () => {
    const teamIds = props.kitchen.current_team.map((member) => member.id);
    const teamQuery = query(
      collection(db, "misebox-users"),
      where("id", "in", teamIds)
    );
    const teamDocs = await getDocs(teamQuery);
    miseboxUsers.value = teamDocs.docs.map((doc) => doc.data());
  };

  fetchTeam();
}
</script>

<style scoped>
.team-section {
  margin-top: var(--spacing-m);
  display: flex;
  justify-content: flex-end; /* Align to bottom-right */
}

.team-list {
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
  flex-wrap: wrap; /* Ensure wrapping for overflow */
}

.team-member {
  display: inline-flex;
}
</style>
