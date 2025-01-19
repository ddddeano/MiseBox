<!-- components/organisms/Kitchen/search/Search.vue -->
<template>
  <div class="kitchen-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="Search for a kitchen..."
      class="editable-input"
    />
    <transition name="dropdown-transistion">
      <div class="dropdown" v-if="mergedResults.length > 0">
        <div
          v-for="result in mergedResults"
          :key="result.id || result.place_id"
          @click="handleSelectKitchen(result)"
          class="kitchen-cell-wrapper"
        >
          <OrganismsKitchenCell :kitchen="result" :isDisabled="true" />
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
  clearSearch, // Import clearSearch
} = useKitchenSearch();

const emits = defineEmits(["select-kitchen"]);

const handleSelectKitchen = (kitchen) => {
  emits("select-kitchen", kitchen);
  clearSearch(); // Clear the search when a kitchen is selected
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};

onMounted(fetchFirestorePlaceIds);
</script>
