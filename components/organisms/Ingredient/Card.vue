<!-- components/organisms/Ingredient/Card.vue -->
<template>
  <div class="card ingredient-card" v-if="ingredient">
    <!-- Header Section -->
    <div class="card-header">
      <div class="card-avatar">
        <MoleculesAvatar :url="ingredient.imageUrl || '/images/default-ingredient.jpg'" size="medium" altText="Ingredient Image" />
      </div>
      <div class="header-content">
        <h2 class="ingredient-name">{{ ingredient.name || "Unnamed Ingredient" }}</h2>
        <p class="type">{{ ingredient.type }}</p>
      </div>
    </div>

    <!-- Additional Info Section -->
    <div class="card-info">
      <p><strong>ID:</strong> {{ ingredient.id }}</p>
      <p><strong>Supplier:</strong> {{ ingredient.supplier || "Unknown" }}</p>
      <p v-if="ingredient.description"><strong>Description:</strong> {{ ingredient.description }}</p>
    </div>
  </div>
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
.ingredient-card {
  border-radius: var(--radius-m);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-m);
  overflow: hidden;
  background-color: var(--background-1);
  padding: var(--spacing-s);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-s);
}

.card-avatar {
  flex-shrink: 0;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.ingredient-name {
  font-size: var(--font-size-m);
  font-weight: bold;
  margin: 0;
}

.type {
  font-size: var(--font-size-s);
  color: var(--text-secondary);
  margin: 0;
}

.card-info {
  margin-top: var(--spacing-s);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: var(--font-size-s);
  color: var(--text-primary);
}
</style>
