<!-- components/organisms/Ingredient/Create.vue -->
<template>
  <div class="wizard">
    <h2>Find or Create an Ingredient</h2>

    <!-- Search for Ingredients -->
    <OrganismsIngredientSearch
      v-if="!hasKeys"
      @select-ingredient="handleSelectIngredient"
      class="wizard-search"
    />

    <!-- Selected Ingredient Cell -->
    <div
      v-if="ingredient.source === 'google' || ingredient.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsIngredientCell :ingredient="ingredient" :isDisabled="true" />
    </div>

    <!-- Manual Input -->
    <div v-if="ingredient.source === 'manual' || !ingredient.source" class="wizard-manual">
      <div class="wizard-divider" v-if="ingredient.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="ingredientName"
        placeholder="Enter the ingredient name..."
        :value="ingredient.name || ''"
        @update:value="(value) => (ingredient.name = value)"
      />
    </div>

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processIngredient">
        {{ ingredient.source ? "Use Selected Ingredient" : "Create Ingredient" }}
      </button>
      <button class="wizard-btn" @click="clearIngredient">Clear</button>
    </div>
  </div>
</template>

<script setup>
const ingredient = ref({});
const { createIngredient } = useIngredient();
const router = useRouter();

const hasKeys = computed(() => Object.keys(ingredient.value).length > 0);

function handleSelectIngredient(selected) {
  ingredient.value = selected; // Set the selected ingredient
}

async function processIngredient() {
  const ingredientId = await createIngredient(ingredient.value); // Save ingredient and get ID
  router.push(`/ingredients/${ingredientId}`); // Navigate to the ingredient's detail page
}

function clearIngredient() {
  ingredient.value = {}; // Reset the ingredient object
}
</script>

<style scoped>
/* Shared or scoped styles as required */
</style>
