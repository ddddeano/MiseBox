<!-- pages/ingredients/create.vue -->
<template>
  <client-only>
    <div class="page">
      <!-- Ensure access control via Ingredient CTA -->
      <OrganismsIngredientCTA />

      <!-- Show ingredient creation form if user is authorized -->
      <OrganismsIngredientCreate v-if="chef || supplier" />
    </div>
  </client-only>
</template>

<script setup>

const { currentChef: chef } = useChef();
const { currentSupplier: supplier } = useSupplier();
</script>
