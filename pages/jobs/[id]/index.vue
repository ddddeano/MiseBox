<!-- pages/jobs/[id]/index.vue -->
<!-- ============================
pages/jobs/[id]/index.vue
============================ -->
<template>
  <client-only>
  <h1>New Job</h1>
  {{job}}
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchJob } = useJob();
const job = fetchJob(route.params.id);


</script>

<style scoped>
.profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}

.job-header {
  text-align: center;
  margin-bottom: var(--spacing-l);
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-m);
}
</style>
