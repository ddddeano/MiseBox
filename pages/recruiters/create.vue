<!-- pages/recruiters/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Recruiter-specific CTA -->
      <OrganismsRecruiterCTA />

      <!-- Render creation form only if no Recruiter profile exists -->
      <OrganismsRecruiterCreate v-if="!recruiter" />
    </div>
  </client-only>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
</script>
