<!-- components/organisms/Job/Cell.vue -->
<template>
  <div class="cell job-cell" v-if="job">
    <!-- Job Info Display -->
    <NuxtLink :to="`/jobs/${job.id}`" class="cell-header">
      <div class="cell-content">
        <p class="display-name">{{ job.title }}</p>
        <p class="location">{{ job.location }}</p>
      </div>
    </NuxtLink>

    <!-- Interaction Section -->
    <div class="special-section">
      <button class="apply-button" @click="applyForJob">Apply</button>
      <button class="save-button" @click="saveJob">Save</button>
    </div>
  </div>
</template>

<script setup>
// Props to receive the full job object
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

// Interaction handlers
const applyForJob = () => {
  alert(`Applied for job: ${props.job.title}`);
};

const saveJob = () => {
  alert(`Saved job: ${props.job.title}`);
};
</script>

<style scoped>
.apply-button,
.save-button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-size: var(--font-size-s);
}

.apply-button:hover,
.save-button:hover {
  background-color: var(--primary-hover);
}
</style>
