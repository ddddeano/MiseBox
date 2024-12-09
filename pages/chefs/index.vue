<template>
  <client-only>
    <div class="index">
      <OrganismsChefCTA />

      <!-- Show the current user's chef profile -->
      <OrganismsChefCard v-if="chef" />

      <!-- Show the list of all chefs -->
      <OrganismsChefList />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>
