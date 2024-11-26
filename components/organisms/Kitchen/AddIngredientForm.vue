<template>
  <form @submit.prevent="addIngredient" class="ingredient-form">
    <input
      type="text"
      v-model="newIngredient"
      placeholder="Add a new ingredient"
      class="editable-input"
    />
    <button type="submit" class="btn-secondary">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';

const props = defineProps({
  ingredientsCollectionRef: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['ingredient-added']);

const newIngredient = ref('');

const addIngredient = async () => {
  if (!newIngredient.value.trim() || !props.ingredientsCollectionRef) return;

  try {
    const ingredientName = newIngredient.value.trim();
    await addDoc(props.ingredientsCollectionRef, { name: ingredientName });
    emit('ingredient-added', ingredientName); // Emit event to notify parent
    newIngredient.value = ''; // Clear the input field
  } catch (error) {
    console.error('Error adding ingredient:', error);
    alert('Failed to add ingredient. Please try again.');
  }
};
</script>

<style scoped>
.ingredient-form {
  display: flex;
  gap: var(--spacing-s);
  margin-bottom: var(--spacing-m);
}

.ingredient-form input {
  flex: 1;
  padding: var(--spacing-xs);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
}
</style>
