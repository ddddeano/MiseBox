<template>
  <li class="ingredient-item">
    <button
      @click="$emit('toggle', ingredient)"
      class="ingredient-toggle"
      :class="{ 'on-order': ingredient.onOrder }"
    >
      <span class="ingredient-name">{{ ingredient.name }}</span>
    </button>
  </li>
</template>

<script setup>
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: 'view', // Could be 'view', 'ordering', etc.
  },
});

defineEmits(['toggle']);
</script>

<style scoped>
.ingredient-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-s);
}

.ingredient-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-s);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  cursor: pointer;
  background-color: var(--background);
  color: var(--text-primary);
  transition: background-color 0.2s, color 0.2s;
}

.ingredient-toggle:hover {
  background-color: var(--hover);
  color: var(--text-secondary);
}

.ingredient-toggle.on-order {
  background-color: var(--primary);
  color: var(--text-primary);
  border-color: var(--secondary);
}

.ingredient-name {
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-medium);
}
</style>
