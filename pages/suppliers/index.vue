<!-- pages/suppliers/index.vue -->
<template>
  <client-only>
    <div class="index">
      <OrganismsSupplierCTA />
      <OrganismsSupplierCard v-if="supplier" />
      <OrganismsSupplierList />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier()
</script>
