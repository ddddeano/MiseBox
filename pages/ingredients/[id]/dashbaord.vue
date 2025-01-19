<!-- pages/ingredients/[id]/dashbaord.vue -->
<!-- ============================
pages/ingredients/[id]/dashboard.vue
============================ -->

<template>
  <client-only>
    <OrganismsIngredientDashboard
      v-if="ingredient"
      :ingredient="ingredient"
    />
  </client-only>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(route.params.id);
</script>
