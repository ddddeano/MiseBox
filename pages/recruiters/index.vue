<!-- pages/recruiters/index.vue -->
<!-- ~/pages/recruiters/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsRecruiterCTA />
      <OrganismsRecruiterCard v-if="recruiter"/>
      <OrganismsRecruiterList />
    </div>
  </client-only>
</template>

<script setup>
const { currentRecruiter: recruiter } = useRecruiter();
</script>

<style scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-l);
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
</style>
