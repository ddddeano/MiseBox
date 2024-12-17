<!-- pages/chefs/[id]/recipe/[recipeId].vue -->
<template>
  <div class="recipe-details-page">
    <h1>{{ recipe.name }}</h1>
    <p><strong>Ingredients:</strong> {{ recipe.ingredients }}</p>
    <p><strong>Preparation Steps:</strong> {{ recipe.steps }}</p>
    <NuxtLink :to="`/chefs/${route.params.id}/recipe/edit/${recipe.id}`">Edit Recipe</NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(null)

onMounted(() => {
  fetchRecipeData()
})

const fetchRecipeData = async () => {
  // Fetch the recipe details by recipeId
}
</script>

<style scoped>
.recipe-details-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-m);
}

h1 {
  margin-bottom: var(--spacing-m);
}
</style>
