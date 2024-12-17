<!-- pages/jobs/index.vue -->
<!-- ~/pages/jobs/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsJobCTA />
      <OrganismsJobList v-if="recruiter" recruiterJobs />
      <OrganismsJobList v-if="professional" professionalApplications />
      <OrganismsJobList all />
    </div>
  </client-only>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
const { currentProfessional: professional } = useProfessional();
</script>
