<!-- pages/ingredients/[id]/edit.vue -->
<!-- ============================
pages/ingredients/[id]/edit.vue
============================ -->
<template>
  <client-only>
    <div v-if="canEditIngredient" class="edit-page">
      <div v-if="ingredient">
        <!-- Ingredient Edit Component -->
        <OrganismsIngredientEdit :ingredient="ingredient" />
      </div>
      <div v-else>
        <p class="loading">Loading ingredient details...</p>
      </div>
    </div>
    <div v-else>
      <p class="no-access">You do not have permission to edit this ingredient.</p>
    </div>
  </client-only>
</template>

<script setup>
// Imports
import { useRoute } from "vue-router";
import { useCurrentUser } from "vuefire";

// Fetch route params and current user
const route = useRoute();
const currentUser = useCurrentUser();

// Hardcoded user ID for administration protection
const miseboxAdministrator = "jMK33p5XlhYS8rBCEf8qUiogfMg2";

// Fetch the ingredient data
const { fetchIngredient } = useIngredient();
const ingredient = fetchIngredient(route.params.id);

// Determine if the user has permission to edit the ingredient
const canEditIngredient = computed(() => currentUser?.value?.uid === miseboxAdministrator);
</script>
