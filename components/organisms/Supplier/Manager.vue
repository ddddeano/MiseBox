<!-- components/organisms/Supplier/Manager.vue -->
<!-- components/organisms/Suppliers/Manager.vue -->
<template>
  <div class="supplier-manager">
    <h2>Manage Suppliers</h2>

    <!-- Add Supplier Form -->
    <OrganismsSuppliersForm @supplier-added="refreshSuppliers" />

    <!-- Supplier List -->
    <ul v-if="suppliers.length" class="supplier-list">
      <li
        v-for="supplier in suppliers"
        :key="supplier.id"
        class="supplier-list-item"
      >
        <OrganismsSuppliersCell
          :supplier="supplier"
          @claim-supplier="claimSupplier(supplier)"
        />
      </li>
    </ul>
    <p v-else class="no-data-message">No suppliers available.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCollection, useFirestore } from 'vuefire';
import { collection, doc, updateDoc } from 'firebase/firestore';

const db = useFirestore();
const suppliersCollectionRef = collection(db, 'suppliers');
const { data: suppliers } = useCollection(suppliersCollectionRef);

const refreshSuppliers = () => {
  console.log('Supplier list refreshed.');
};

const claimSupplier = async (supplier) => {
  const supplierDocRef = doc(db, 'suppliers', supplier.id);
  await updateDoc(supplierDocRef, {
    claimedBy: 'currentUserId', // Replace with dynamic user ID
  });
  alert(`Supplier ${supplier.name} has been claimed!`);
};
</script>

<style scoped>
.supplier-manager {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}

.supplier-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
}

.no-data-message {
  text-align: center;
  color: var(--text-secondary);
}
</style>
