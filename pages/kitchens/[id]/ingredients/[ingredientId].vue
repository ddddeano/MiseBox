<template>
  <client-only>
    <div class="ingredient-detail">
      <h1>Ingredient: {{ ingredient?.name }}</h1>
      <p><strong>Status:</strong> {{ ingredient?.status }}</p>

      <form @submit.prevent="updateIngredient">
        <label for="status">Update Status:</label>
        <select id="status" v-model="updatedStatus" class="status-select">
          <option value="available">Available</option>
          <option value="onOrder">On Order</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore, useCurrentUser } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';

const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

const ingredientId = route.params.ingredientId;
const kitchenId = route.params.id;

// Ingredient document reference (with currentUser check)
const ingredientDocRef = computed(() =>
  currentUser.value ? doc(db, `kitchens/${kitchenId}/ingredients/${ingredientId}`) : null
);

// Fetch ingredient data
const { data: ingredient } = useDocument(ingredientDocRef);

const updatedStatus = ref(ingredient?.value?.status || 'available');

const updateIngredient = async () => {
  if (!ingredientDocRef.value) {
    alert('You must be logged in to update ingredients.');
    return;
  }

  try {
    await updateDoc(ingredientDocRef.value, { status: updatedStatus.value });
    alert('Ingredient status updated successfully!');
  } catch (error) {
    console.error('Error updating ingredient:', error);
    alert('Failed to update ingredient. Please try again.');
  }
};
</script>

<style scoped>
.ingredient-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-m);
}

.status-select {
  margin: var(--spacing-s) 0;
  padding: var(--spacing-xs);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
}

.status-select:focus {
  outline: none;
  border-color: var(--primary);
}
</style>
