<!-- components/organisms/Ingredient/search/Search.vue -->
<template>
  <div class="ingredient-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for an ingredient..."
      class="editable-input"
    />
    <transition name="dropdown-transistion">
      <div class="dropdown" v-if="firestoreResults.length > 0">
        <div
          v-for="result in firestoreResults"
          :key="result.id"
          @click="handleSelectIngredient(result)"
          class="ingredient-cell-wrapper"
        >
          <OrganismsIngredientCell :ingredient="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

const {
  searchQuery,
  firestoreResults,
  searchFirestore,
  clearSearch,
} = useIngredientSearch();

const emits = defineEmits(["select-ingredient"]);

const handleSelectIngredient = (ingredient) => {
  emits("select-ingredient", ingredient);
  clearSearch(); // Clear the search when an ingredient is selected
};

const performSearch = async () => {
  await searchFirestore();
};
</script>
