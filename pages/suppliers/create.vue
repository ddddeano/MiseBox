<!-- pages/suppliers/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Supplier-specific CTA -->
      <OrganismsSupplierCTA />

      <!-- Render creation form only if no Supplier profile exists -->
      <OrganismsSupplierCreate v-if="!supplier" />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier();
</script>
