<!-- components/organisms/Job/Cell.vue -->
<template>
  <div
    class="cell job-cell"
    v-if="job"
    :class="{ 'created-by-user': job.createdBy === currentUser?.uid }"
  >
    <!-- Header Section -->
    <NuxtLink
      :to="isDisabled ? null : `/jobs/${job.id}`"
      class="cell-header"
      :class="{ disabled: isDisabled }"
    >
      <!-- Avatar Section -->
      <div v-if="job.company_logo" class="cell-avatar">
        <MoleculesAvatar :url="job.company_logo" size="small" altText="Company Logo" />
      </div>

      <!-- Header Content -->
      <div class="header-content">
        <div class="title">{{ jobTitle }}</div>
        <div class="company">{{ jobCompany }}</div>
      </div>

      <!-- Navigation Icon -->
      <div v-if="!isDisabled" class="icon">
        <ChevronRightIcon />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCurrentUser } from "vuefire";

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const currentUser = useCurrentUser();

const jobTitle = computed(() => props.job.title || "Untitled Job");

const jobCompany = computed(() => props.job.company || "Unknown Company");
</script>

<style scoped>
.cell-header {
  display: flex;
  gap: var(--spacing-m);
  text-decoration: none;
  color: inherit;
  padding: var(--spacing-s) var(--spacing-m);
  align-items: center;
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.title {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.company {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin-top: var(--spacing-xxs);
}

.created-by-user {
  border: 2px solid var(--primary);
  background-color: var(--background-highlight);
}
</style>
