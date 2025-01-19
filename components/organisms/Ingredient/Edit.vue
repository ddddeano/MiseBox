<!-- components/organisms/Ingredient/Edit.vue -->
<template>
  <client-only>
    <div class="edit-view" v-if="ingredient">
      <h1>Edit Ingredient: {{ ingredient.name }}</h1>
<!-- 
      <MoleculesFormsObjectArray
        label="Ingredient Details"
        :firebaseValue="ingredient.details"
      >
        <template #display="{ item, index }">
          <OrganismsIngredientFieldsDetails
            :detail="item"
            :index="index"
            :id="ingredient.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsIngredientFieldsDetails
            :detail="item"
            :index="index"
            :id="ingredient.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsIngredientFieldsDetails :id="ingredient.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <MoleculesFormsObjectArray
        label="Categories"
        :firebaseValue="ingredient.categories"
      >
        <template #display="{ item, index }">
          <OrganismsIngredientFieldsCategories
            :category="item"
            :index="index"
            :id="ingredient.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsIngredientFieldsCategories
            :category="item"
            :index="index"
            :id="ingredient.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsIngredientFieldsCategories :id="ingredient.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray>

      <MoleculesFormsObjectArray
        label="Nutritional Information"
        :firebaseValue="ingredient.nutritionalInfo"
      >
        <template #display="{ item, index }">
          <OrganismsIngredientFieldsNutrition
            :nutrition="item"
            :index="index"
            :id="ingredient.id"
            mode="display"
          />
        </template>
        <template #edit="{ item, index }">
          <OrganismsIngredientFieldsNutrition
            :nutrition="item"
            :index="index"
            :id="ingredient.id"
            mode="edit"
          />
        </template>
        <template #create>
          <OrganismsIngredientFieldsNutrition :id="ingredient.id" mode="create" />
        </template>
      </MoleculesFormsObjectArray> -->
    </div>
    <div v-else>
      <p class="loading">Loading...</p>
    </div>
  </client-only>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import { useRoute } from "vue-router";

// Fetch the current user and ingredient data
const currentUser = useCurrentUser();
const { fetchIngredient } = useIngredient();
const { id } = useRoute().params;

const ingredient = fetchIngredient(id);
</script>
