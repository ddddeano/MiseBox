<!-- pages/suppliers/[id].vue -->
<template>
  <div class="supplier-detail-page">
    <h1>Supplier Details</h1>
    <OrganismsSuppliersManager :supplierId="route.params.id" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
