<!-- pages/kitchens/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsKitchenCTA />
      <!-- Show Chef's Kitchens -->
      <OrganismsKitchenList mode="chefsKitchens" />
      <!-- Show All Kitchens -->
      <OrganismsKitchenList mode="allKitchens" />
    </div>
  </client-only>
</template>

<script setup>
const { currentChef: chef } = useChef();
</script>
