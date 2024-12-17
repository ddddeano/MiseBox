<!-- components/organisms/Job/Card.vue -->
<template>
  <div class="card job-card" v-if="job">
    <!-- Clickable Link to Job Profile -->
    <NuxtLink :to="`/jobs/${job.id}`" class="view-job-link">
      <div class="card-header">
        <div class="job-info">
          <p class="title">{{ job.title }}</p>
          <p class="location">{{ job.location }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Expanded Content -->
    <div class="card-expanded">
      <p class="description" v-if="job.description">{{ job.description }}</p>
      <p class="recruiter" v-if="job.recruiterId">
        Posted by: <NuxtLink :to="`/recruiters/${job.recruiterId}`">Recruiter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDocument, useCurrentUser } from "vuefire";
import { doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

// Prop for job ID
const props = defineProps({
  jobId: {
    type: String,
    required: true,
  },
});

const db = useFirestore();
const currentUser = useCurrentUser();

// Fetch job document
const jobDocRef = computed(() =>
  currentUser.value ? doc(db, "jobs", props.jobId) : null
);

const { data: job } = useDocument(jobDocRef);
</script>

<style scoped>
.job-info .title {
  font-weight: bold;
  font-size: var(--font-size-m);
  margin-bottom: 0.5rem;
}

.job-info .location {
  color: var(--text-secondary);
  font-size: var(--font-size-s);
}

.card-expanded .description {
  margin-top: 1rem;
  color: var(--text-primary);
  font-size: var(--font-size-m);
}
</style>
