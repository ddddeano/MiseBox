<!-- components/organisms/Supplier/List.vue -->
<template>
  <div class="list">
    <div v-if="suppliers?.length">
      <div
        v-for="supplier in filteredSuppliers"
        :key="supplier.id"
        class="list-item"
      >
        <OrganismsSupplierCell :supplier="supplier" />
      </div>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore, useCurrentUser } from "vuefire";

const db = useFirestore();
const currentUser = useCurrentUser();

const collectionRef = computed(() =>
  currentUser.value ? collection(db, "suppliers") : null
);
const { data: suppliers } = useCollection(collectionRef);

const filteredSuppliers = computed(() =>
  suppliers?.value?.filter((supplier) => supplier.id !== currentUser.value?.uid) || []
);
</script>
