<!-- pages/professionals/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsProfessionalCTA />
      <OrganismsProfessionalCard v-if="professional" />
      <OrganismsProfessionalList />
    </div>
  </client-only>
</template>

<script setup>
const { currentProfessional: professional } = useProfessional()
</script>
