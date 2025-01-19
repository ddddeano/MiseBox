<!-- components/organisms/Kitchen/View.vue -->
<template>
  <client-only>
    <div v-if="kitchen" class="view-profile">
      <section>
        <h2 class="view-profile-title">Kitchen Details</h2>
        <p><strong>Name:</strong> {{ kitchen.name }}</p>
        <p><strong>Location:</strong> {{ kitchen.formatted_address }}</p>
        <p><strong>Description:</strong> {{ kitchen.description }}</p>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Kitchen details not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  kitchen: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Styling similar to Professional */
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
