<template>
  <client-only>
    <div class="create-order">
      <!-- Back to Inventory Button -->
      <div class="back-button">
        <NuxtLink
          :to="`/kitchens/${route.params.id}`"
          class="btn btn-secondary btn-pill"
        >
          Back to Inventory
        </NuxtLink>
      </div>

      <!-- Add Ingredient Form -->
      <OrganismsKitchenAddIngredientForm
        :ingredientsCollectionRef="ingredientsCollectionRef"
        @ingredient-added="handleIngredientAdded"
      />

      <h1>Create Order</h1>

      <!-- Ingredient List -->
      <div class="order-tab">
        <ul v-if="orderedIngredients.length" class="order-list">
          <li
            v-for="ingredient in orderedIngredients"
            :key="ingredient.id"
            class="order-item"
          >
            <label class="checkbox-container">
              <input
                type="checkbox"
                :value="ingredient.id"
                v-model="selectedIngredients"
              />
              <span class="checkbox-mark"></span>
            </label>
            <span class="order-item-name">{{ ingredient.name }}</span>
          </li>
        </ul>

        <p v-else class="no-ingredients-message">
          No ingredients available in the order.
        </p>

        <!-- Action Buttons -->
        <div class="order-actions" v-if="orderedIngredients.length">
          <button
            type="button"
            class="btn btn-secondary"
            @click="removeSelectedIngredients"
            :disabled="!selectedIngredients.length"
          >
            Remove Selected
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="removeAllIngredients"
          >
            Remove All
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="confirmOrder"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCollection } from 'vuefire';
import { doc, collection, updateDoc, addDoc } from 'firebase/firestore';
import { useFirestore, useCurrentUser } from 'vuefire';

const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

const kitchenId = computed(() => route.params.id);

const kitchenDocRef = computed(() =>
  currentUser.value && kitchenId.value ? doc(db, 'kitchens', kitchenId.value) : null
);

const ingredientsCollectionRef = computed(() =>
  kitchenDocRef.value ? collection(kitchenDocRef.value, 'ingredients') : null
);

const ordersCollectionRef = computed(() =>
  kitchenDocRef.value ? collection(kitchenDocRef.value, 'orders') : null
);

const { data: ingredients } = useCollection(ingredientsCollectionRef);

const orderedIngredients = computed(() =>
  ingredients?.value?.filter((ingredient) => ingredient.onOrder) || []
);

const selectedIngredients = ref([]);

const handleIngredientAdded = (ingredientName) => {
  console.log(`Ingredient "${ingredientName}" added.`);
};

const removeSelectedIngredients = async () => {
  try {
    const promises = selectedIngredients.value.map((id) => {
      const ingredientDocRef = doc(ingredientsCollectionRef.value, id);
      return updateDoc(ingredientDocRef, { onOrder: false });
    });

    await Promise.all(promises);
    selectedIngredients.value = [];
    console.log('Selected ingredients removed from the order.');
  } catch (error) {
    console.error('Error removing selected ingredients:', error);
  }
};

const removeAllIngredients = async () => {
  try {
    const promises = orderedIngredients.value.map((ingredient) => {
      const ingredientDocRef = doc(ingredientsCollectionRef.value, ingredient.id);
      return updateDoc(ingredientDocRef, { onOrder: false });
    });

    await Promise.all(promises);
    console.log('All ingredients removed from the order.');
  } catch (error) {
    console.error('Error removing all ingredients:', error);
  }
};

const confirmOrder = async () => {
  try {
    const orderData = orderedIngredients.value.map((ingredient) => ({
      name: ingredient.name,
      id: ingredient.id,
    }));

    await addDoc(ordersCollectionRef.value, {
      order: orderData,
      timestamp: new Date(),
    });

    // Reset the onOrder status for all confirmed ingredients
    const resetPromises = orderedIngredients.value.map((ingredient) => {
      const ingredientDocRef = doc(ingredientsCollectionRef.value, ingredient.id);
      return updateDoc(ingredientDocRef, { onOrder: false });
    });

    await Promise.all(resetPromises);
    selectedIngredients.value = [];
    console.log('Order confirmed and saved to kitchen.orders.');
  } catch (error) {
    console.error('Error confirming order:', error);
  }
};
</script>

<style scoped>
.create-order {
  margin-top: var(--spacing-m);
  text-align: center;
}

.back-button {
  margin-bottom: var(--spacing-m);
  text-align: left;
}

.order-tab {
  margin-top: var(--spacing-m);
}

.order-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-m) 0;
  border-top: 1px solid var(--border);
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-s);
  border-bottom: 1px solid var(--border);
}

.order-item:last-child {
  border-bottom: none;
}

.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-container input {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.checkbox-mark {
  height: 20px;
  width: 20px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  display: inline-block;
}

.checkbox-container input:checked ~ .checkbox-mark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkbox-mark:after {
  content: '';
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkbox-mark:after {
  display: block;
}

.checkbox-container .checkbox-mark:after {
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.order-item-name {
  flex: 1;
  margin-left: var(--spacing-s);
}

.order-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-s);
  margin-top: var(--spacing-m);
}

.no-ingredients-message {
  text-align: center;
  color: var(--text-secondary);
}
</style>
