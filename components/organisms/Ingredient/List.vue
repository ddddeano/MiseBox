<!-- components/organisms/Ingredient/List.vue -->
<template>
  <div class="list">
    <p>All Ingredients</p>
    <template v-if="ingredients?.length">
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="list-item"
      >
        <!-- Use the IngredientCell component -->
        <OrganismsIngredientCell :ingredient="ingredient" />
      </div>
    </template>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const { ingredientsCollection } = useIngredient();

const ingredients = ingredientsCollection();
</script>
