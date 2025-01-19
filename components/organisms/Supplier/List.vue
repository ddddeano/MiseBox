<!-- components/organisms/Supplier/List.vue -->
<template>
  <div class="list">
    <div v-if="filteredSuppliers?.length">
      <OrganismsSupplierCell
        v-for="supplier in filteredSuppliers"
        :key="supplier.id"
        :supplier="supplier"
      />
    </div>
    <p v-else>No suppliers found.</p>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();

const { suppliersCollection } = useSupplier();

const suppliers = suppliersCollection();

const filteredSuppliers = computed(() =>
  suppliers?.value?.filter((supplier) => supplier.id !== currentUser.value?.uid) || []
);
</script>
