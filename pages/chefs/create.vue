<!-- pages/chefs/create.vue -->
<template>
  <client-only>
    <div class="page">
      <OrganismsChefCTA />
      <OrganismsChefCreate v-if="!chef" />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>
