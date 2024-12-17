<!-- components/organisms/Supplier/Form.vue -->
<!-- components/organisms/Suppliers/Form.vue -->
<template>
  <form @submit.prevent="addSupplier" class="form-wrapper">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="supplier.name"
        type="text"
        placeholder="Supplier Name"
        class="form-input"
      />
    </div>
    <div class="form-group">
      <label for="phone">Phone</label>
      <input
        id="phone"
        v-model="supplier.contact.phone"
        type="text"
        placeholder="Phone Number"
        class="form-input"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="supplier.contact.email"
        type="email"
        placeholder="Email Address"
        class="form-input"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Supplier</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const db = useFirestore();
const supplier = ref({
  name: '',
  contact: {
    phone: '',
    email: '',
  },
});

const addSupplier = async () => {
  if (!supplier.value.name.trim()) return;

  const supplierDoc = {
    ...supplier.value,
    createdAt: new Date(),
  };

  await addDoc(collection(db, 'suppliers'), supplierDoc);

  // Reset form
  supplier.value = {
    name: '',
    contact: {
      phone: '',
      email: '',
    },
  };

  alert('Supplier added successfully!');
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

.form-input {
  padding: var(--spacing-xs);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}
</style>
