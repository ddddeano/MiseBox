<!-- components/organisms/Job/Create.vue -->
<template>
  <div class="wizard">
    <h2>Create or Edit a Job</h2>

    <!-- Input for Job Title -->
    <MoleculesFormsSingleFieldLocal
      id="jobTitle"
      placeholder="Enter the job title"
      :value="job.title || ''"
      @update:value="(value) => (job.title = value)"
    />

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processJob">Save Job</button>
      <button class="wizard-btn" @click="clearJob">Clear</button>
    </div>
  </div>
</template>

<script setup>
const job = ref({});
const { createJob } = useJob();
const router = useRouter();

const hasKeys = computed(() => Object.keys(job.value).length > 0);

async function processJob() {
  const jobId = await createJob(job.value); // Save job and get ID
  router.push(`/jobs/${jobId}`); // Navigate to the job's detail page
}

function clearJob() {
  job.value = {}; // Reset the job object
}
</script>

<style scoped>
/* Shared or scoped styles can be added as required */
</style>
