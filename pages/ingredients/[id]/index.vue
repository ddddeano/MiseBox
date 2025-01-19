<!-- pages/ingredients/[id]/index.vue -->
<template>
  <client-only>
    <div v-if="ingredient" class="page">
      <h1 class="ingredient-title">{{ ingredient.name }}</h1>

      <!-- <OrganismsIngredientLinkChef v-if="chef" :ingredient="ingredient" /> -->

      <OrganismsIngredientLinkSupplier v-if="supplier" :ingredient="ingredient" />
    </div>
    <div v-else>
      <p class="loading">Loading ingredient details...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const ingredientId = route.params.id;

const { fetchIngredient } = useIngredient();
const ingredient = await fetchIngredient(ingredientId);


const { currentSupplier: supplier } = useSupplier();
const { currentChef: chef } = useChef();

</script>

<style scoped>
.ingredient-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.loading {
  font-size: 16px;
  color: #555;
}
</style>
