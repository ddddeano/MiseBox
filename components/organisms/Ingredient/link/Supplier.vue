<template>
  <client-only>
    <div class="supplier-ingredient-toggle">
      <h2>Supplier Ingredient</h2>
      <p>{{ ingredient.name }}</p>

      <!-- Add to Supplier Button -->
      <button @click="addToSupplier">Add to Supplier</button>

      <!-- Display Supplier Catalog -->
      <h3>Supplier Catalog</h3>
      <ul v-if="catalog?.length">
        <li v-for="item in catalog" :key="item.id">
          {{ item.name }}
          <!-- Remove Button -->
          <button @click="removeFromSupplier(item.id)" class="remove-btn">
            Remove
          </button>
        </li>
      </ul>
      <p v-else>No ingredients in the catalog yet.</p>
    </div>
  </client-only>
</template>

<script setup>
// Props
const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
});

// Dependencies
import { computed } from "vue";
const { 
  currentSupplier: supplier, 
  fetchSupplierSubCollection, 
  addIngredientToSupplier, 
  removeSupplierSubcollectionItem 
} = useSupplier();

// Reactive catalog state fetched directly from Vuefire
const catalog = fetchSupplierSubCollection("catalog");

// Function to add the ingredient to the supplier's catalog
async function addToSupplier() {
  if (!supplier.value?.id) {
    console.warn("Supplier data is not ready yet.");
    return;
  }

  try {
    // Add the ingredient to the supplier's catalog
    await addIngredientToSupplier({
      id: props.ingredient.id,
      name: props.ingredient.name,
    });

    alert(`Ingredient "${props.ingredient.name}" added to supplier's catalog successfully!`);
  } catch (error) {
    console.error("Error adding ingredient to supplier:", error.message);
    alert("Failed to add ingredient to supplier.");
  }
}

// Function to remove the ingredient from the supplier's catalog
async function removeFromSupplier(ingredientId) {
  if (!supplier.value?.id) {
    console.warn("Supplier data is not ready yet.");
    return;
  }

  try {
    // Remove the ingredient from the supplier's catalog
    await removeSupplierSubcollectionItem(supplier.value.id, "catalog", ingredientId);

    alert(`Ingredient removed from supplier's catalog successfully!`);
  } catch (error) {
    console.error("Error removing ingredient from supplier:", error.message);
    alert("Failed to remove ingredient from supplier.");
  }
}
</script>

<style scoped>
.supplier-ingredient-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #4b47a6;
}

.remove-btn {
  background-color: #e74c3c;
  margin-left: 10px;
}

.remove-btn:hover {
  background-color: #c0392b;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 5px 0;
  font-size: 16px;
}
</style>
