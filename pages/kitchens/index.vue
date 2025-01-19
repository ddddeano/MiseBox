<!-- pages/kitchens/index.vue -->
<template>
  <client-only>
    <div class="index">
      <!-- Wrap KitchenCTA inside MiseboxUserCTA -->
      <OrganismsMiseboxUserCTA>
        <OrganismsKitchenCTA />
      </OrganismsMiseboxUserCTA>

      <!-- General kitchen list accessible to all users -->
      <OrganismsKitchenList :kitchens="kitchens" title="All Kitchens" />
    </div>
  </client-only>
</template>

<script setup>
const { kitchensCollection } = useKitchen();

// Fetch all kitchens
const kitchens = kitchensCollection();
</script>
