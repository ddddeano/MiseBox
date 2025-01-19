<!-- components/organisms/Kitchen/ingredients/Form.vue -->
<!-- OrganismsKitchenIngredientsForm.vue -->
<template>
  <form @submit.prevent="addIngredient" class="form-wrapper">
    <div class="item-input-container">
      <input
        type="text"
        v-model="newIngredient"
        placeholder="Add a new ingredient"
        class="item-input"
      />
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </form>
</template>

<script setup>
import { addDoc, collection } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const db = useFirestore();

const props = defineProps({
  kitchenId: {
    type: String,
    required: true,
  },
});

const newIngredient = ref('');

const addIngredient = async () => {
  if (!newIngredient.value.trim()) return;

  try {
    const ingredient = {
      name: newIngredient.value.trim(),
      id: Date.now().toString(),
    };
    const ingredientsRef = collection(db, `kitchens/${props.kitchenId}/ingredients`);
    await addDoc(ingredientsRef, ingredient);

    newIngredient.value = '';
  } catch (error) {
    console.error('Error adding ingredient:', error);
  }
};
</script>
