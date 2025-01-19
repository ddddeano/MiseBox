<!-- components/organisms/Supplier/search/Search.vue -->
<template>
  <div class="supplier-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a supplier..."
      class="editable-input"
    />
    <transition name="dropdown">
      <div class="dropdown supplier-search-dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectSupplier(result)"
          class="supplier-cell-wrapper"
        >
          <OrganismsSupplierCell :supplier="result" :isDisabled="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const {
  searchQuery,
  mergedResults,
  fetchFirestorePlaceIds,
  searchFirestore,
  searchGoogle,
  clearSearch,
} = useSupplierSearch();

const emits = defineEmits(["select-supplier"]);

const handleSelectSupplier = (supplier) => {
  emits("select-supplier", supplier);
  clearSearch(); // Clear the search when a supplier is selected
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};

onMounted(fetchFirestorePlaceIds);
</script>

