<!-- pages/chefs/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsChefCTA />
      <OrganismsChefCard v-if="chef" />
      <OrganismsChefList />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>
