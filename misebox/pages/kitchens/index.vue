<!-- pages/kitchens.vue -->

<template>
  <client-only>
    <div class="search-container">
      <!-- Reusable kitchen search component -->
      <OrganismsKitchenSearch @select-kitchen="selectKitchen" />

      <!-- Selected Kitchen Display and Confirm Button -->
      <div v-if="selectedKitchen" class="selected-place">
        <h3>Selected Kithen</h3>
        <pre>
        {{ {
          ...selectedKitchen,
          photo_url: selectedKitchen.photo_url.slice(0, 5) + '...'
        } }}
      </pre>
        <p>Name: {{ selectedKitchen.place_name }}</p>
        <p>Address: {{ selectedKitchen.formatted_address }}</p>
        <p>City: {{ selectedKitchen.city }}</p>
        <p>Region: {{ selectedKitchen.region }}</p>
        <p>Country: {{ selectedKitchen.country }}</p>
        <button @click="confirmKitchen">Confirm Kitchen</button>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';

const selectedKitchen = ref(null);

const selectKitchen = (kitchen) => {
  selectedKitchen.value = kitchen;
};

const confirmKitchen = () => {
  // Confirm the selected kitchen logic here and must geerate     const searchPhraseLower = item.search_phrase.toLowerCase();

  console.log('Kitchen confirmed:', selectedKitchen.value);
};
</script>
