<!-- components/organisms/Supplier/View.vue -->
<template>
  <client-only>
    <div v-if="supplier" class="view-profile">
      <section>
        <h2 class="view-profile-title">Supplier Profile</h2>
        <p><strong>Name:</strong> {{ supplier.name }}</p>
        <p><strong>Location:</strong> {{ supplier.location }}</p>
        <p><strong>Specialty:</strong> {{ supplier.specialty }}</p>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Supplier profile not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  supplier: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Similar styling as Professional */
.view-profile {
  padding: var(--spacing-m);
  max-width: 800px;
  margin: 0 auto;
}
.section {
  background-color: var(--background-2);
  margin-bottom: var(--spacing-l);
  padding: var(--spacing-m);
  border-radius: var(--radius-s);
}
</style>
