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
    <div class="kitchen-search-dropdown" v-if="mergedResults.length > 0">
      <div
        v-for="result in mergedResults"
        :key="result.kitchenId || result.place_id"
        @click="emitSelectedKitchen(result)"
        class="kitchen-cell-wrapper"
      >
        <!-- Pass isDisabled as true to disable links in search results -->
        <OrganismsKitchenCell :kitchen="result" :isDisabled="true" />
      </div>
    </div>

    <!-- No results -->
    <div v-else class="no-results">
      <p>Cannot find a kitchen? <NuxtLink to="/kitchens/create">Create one manually here</NuxtLink>.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { defineEmits } from "vue";

const emits = defineEmits(["select-kitchen"]);

const {
  searchQuery,
  mergedResults,
  fetchFirestorePlaceIds,
  searchFirestore,
  searchGoogle,
} = useKitchenSearch();

const emitSelectedKitchen = (kitchen) => {
  emits("select-kitchen", kitchen);
};

const performSearch = async () => {
  await Promise.all([searchFirestore(), searchGoogle()]);
};

onMounted(fetchFirestorePlaceIds);
</script>

<style scoped>
.kitchen-search {
  width: 100%;
}

.kitchen-cell-wrapper {
  cursor: pointer;
  margin-bottom: var(--spacing-s);
}

.no-results {
  margin-top: var(--spacing-m);
  text-align: center;
  font-size: var(--font-size-m);
}

.no-results a {
  color: var(--primary);
  text-decoration: underline;
  cursor: pointer;
}
</style>
