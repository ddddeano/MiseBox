<!-- pages/jobs/[id]/edit.vue -->
<!-- ============================
pages/jobs/[id]/edit.vue
============================ -->

<template>
  <client-only>
    <div class="edit-page">
      <div v-if="job">
        <!-- Job Edit Component -->
        <OrganismsJobEdit :job="job" />
      </div>
      <div v-else>
        <p class="loading">Loading...</p>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

// Fetch the job data
const { fetchJob } = useJob();
const job = fetchJob(route.params.id);
</script>
