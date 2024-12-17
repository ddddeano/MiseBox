<!-- components/organisms/Job/List.vue -->
<template>
  <div class="list">
    <!-- Show filtered jobs based on the mode -->
    <p>{{ mode === 'recruiterJobs' ? 'Your Jobs' : mode === 'professionalApplications' ? 'Your Applications' : 'All Jobs' }}</p>

    <div v-if="filteredJobs.length">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="list-item"
      >
        <OrganismsJobCell :job="job" />
      </div>
    </div>

    <!-- Fallback loading message -->
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

// Get the current recruiter or professional data
const { currentRecruiter: recruiter } = useRecruiter();
const { currentProfessional: professional } = useProfessional();

// Get the mode for which jobs to display
const props = defineProps({
  mode: {
    type: String,
    default: "all", // Default is to show all jobs
    validator(value) {
      // The valid values for mode are 'recruiterJobs', 'professionalApplications', or 'all'
      return ['recruiterJobs', 'professionalApplications', 'all'].includes(value);
    },
  },
});

// Firestore instance
const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch jobs collection only if currentUser is available
const jobsCollectionRef = computed(() =>
  currentUser.value ? collection(db, "jobs") : null
);

const { data: jobs } = useCollection(jobsCollectionRef);

// Filter jobs based on the mode
const filteredJobs = computed(() => {
  let filtered = jobs.value || [];

  if (props.mode === 'recruiterJobs' && recruiter) {
    // Show only the jobs posted by the recruiter
    filtered = filtered.filter(job => job.recruiterId === recruiter.id);
  } else if (props.mode === 'professionalApplications' && professional) {
    // Show only the jobs applied to by the professional
    filtered = filtered.filter(job => job.applications.includes(professional.id));
  }

  // If currentRecruiter or currentProfessional exists, exclude their job IDs
  if (recruiter) {
    filtered = filtered.filter(job => job.recruiterId !== recruiter.id);
  }

  if (professional) {
    filtered = filtered.filter(job => !job.applications.includes(professional.id));
  }

  return filtered;
});
</script>
