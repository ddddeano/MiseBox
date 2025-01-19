<!-- pages/ingredients/index.vue -->
<template>
  <client-only>
    <div class="index">

      <pre>{{supplier}}</pre>
      <OrganismsIngredientCTA />
      <OrganismsIngredientList />
    </div>
  </client-only>
</template>

<script setup>
const { currentSupplier: supplier } = useSupplier();

</script>