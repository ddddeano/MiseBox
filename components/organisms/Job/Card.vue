<!-- components/organisms/Job/Card.vue -->
<template>
  <div class="card job-card" v-if="job">
    <!-- Header Section -->
    <div class="card-header">
      <div class="job-info">
        <h2 class="title">{{ job.title }}</h2>
        <p class="location">{{ job.location || "No location specified" }}</p>
      </div>
    </div>

    <!-- Additional Info Section -->
    <div class="card-info">
      <p><strong>Description:</strong> {{ job.description || "No description available" }}</p>
      <p v-if="job.recruiterId">
        <strong>Recruiter:</strong> 
        <NuxtLink :to="`/recruiters/${job.recruiterId}`">View Recruiter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.job-card {
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

.job-info {
  flex: 1;
}

.title {
  font-size: var(--font-size-m);
  font-weight: bold;
}

.location {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
}

.card-info {
  margin-top: var(--spacing-s);
  font-size: var(--font-size-s);
}
</style>
