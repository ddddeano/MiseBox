<!-- components/organisms/Ingredient/View.vue -->
<template>
  <client-only>
    <div v-if="ingredient" class="view-profile">
      <section>
        <h2 class="view-profile-title">Ingredient Details</h2>
        <p><strong>Name:</strong> {{ ingredient.name }}</p>
        <p><strong>Type:</strong> {{ ingredient.type }}</p>
        <p><strong>Description:</strong> {{ ingredient.description }}</p>
      </section>
    </div>
    <div v-else>
      <p class="error-message">Ingredient details not found.</p>
    </div>
  </client-only>
</template>

<script setup>
const props = defineProps({
  ingredient: {
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
