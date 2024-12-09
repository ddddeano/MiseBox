<template>
  <client-only>
    <div class="index">
      <OrganismsProfessionalCTA />

      <!-- Show the current user's professional profile -->
        <OrganismsProfessionalCard v-if="professional"/>

      <!-- Show the list of all professionals -->
      <OrganismsProfessionalList />
    </div>
  </client-only>
</template>

<script setup>
const { currentProfessional: professional } = useProfessional();
</script>
