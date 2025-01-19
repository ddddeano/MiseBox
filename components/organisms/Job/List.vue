<!-- components/organisms/Job/List.vue -->
<template>
  <div class="list">
    <p>{{ mode === 'myJobs' ? 'My Jobs' : 'All Jobs (excluding my jobs)' }}</p>

    <div v-if="jobsToDisplay.length">
      <div
        v-for="job in jobsToDisplay"
        :key="job.id"
        class="list-item"
      >
        <OrganismsJobCell :job="job" />
      </div>
    </div>

    <p v-else>No jobs found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const { jobsCollection } = useJob();
const { currentProfessional: professional } = useProfessional();
const { currentRecruiter: recruiter } = useRecruiter();

const props = defineProps({
  mode: {
    type: String,
    default: '',
  },
});

// Extract job IDs for "My Jobs"
const myJobIds = computed(() => {
  const professionalJobs = professional?.value?.jobs || [];
  const recruiterJobs = recruiter?.value?.jobs || [];
  return [...professionalJobs, ...recruiterJobs].map(job => job.id);
});

// Filter jobs based on mode
const jobsToDisplay = computed(() => {
  const allJobs = jobsCollection?.value || [];
  if (props.mode === 'myJobs') {
    // Display only "My Jobs"
    return allJobs.filter(job => myJobIds.value.includes(job.id));
  } else {
    // Exclude "My Jobs" from "All Jobs"
    return allJobs.filter(job => !myJobIds.value.includes(job.id));
  }
});
</script>
