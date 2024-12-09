<template>
  <client-only>
    <div class="index">
      <OrganismsSupplierCTA />

      <!-- Show the current user's supplier profile -->
        <OrganismsSupplierCard v-if="supplier"/>

      <!-- Show the list of all suppliers -->
      <OrganismsSupplierList />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier();
</script>
