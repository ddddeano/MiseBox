<!-- pages/professionals/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Professional-specific CTA -->
      <OrganismsProfessionalCTA />

      <!-- Render creation form only if no Professional profile exists -->
      <OrganismsProfessionalCreate v-if="!professional" />
    </div>
  </client-only>
</template>

<script setup>
const { currentProfessional: professional } = useProfessional();
</script>
