<template>
  <div class="recipe-create-page">
    <h1>Create a New Recipe</h1>
    <OrganismsChefRecipeForm mode="create" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const chefId = route.params.id
</script>

<style scoped>
.recipe-create-page {
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
