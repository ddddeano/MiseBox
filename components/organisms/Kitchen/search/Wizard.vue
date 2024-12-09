<template>
  <div class="kitchen-wizard">
    <!-- Kitchen Search -->
    <OrganismsKitchenSearch @select-kitchen="handleSelectKitchen" />
    <!-- Selected Kitchen -->
    <div v-if="selectedKitchen" class="selected-kitchen">
      <OrganismsKitchenCell :kitchen="selectedKitchen" />

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-primary" @click="confirmKitchen">Confirm Kitchen</button>
        <button class="btn btn-secondary" @click="resetSelection">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { createKitchen } = useKitchen();
const selectedKitchen = ref(null);

// Handle kitchen selection from the search component
const handleSelectKitchen = (kitchen) => {
  selectedKitchen.value = kitchen;
};

// Confirm the selected kitchen and create it in Firestore
const confirmKitchen = async () => {
  try {
    const kitchenId = await createKitchen(selectedKitchen.value);
    if (kitchenId) {
      resetSelection(); // Reset selection after confirmation
    }
  } catch (error) {
    console.error("Error creating kitchen:", error);
    alert("An error occurred while creating the kitchen. Please try again.");
  }
};

// Reset the selected kitchen
const resetSelection = () => {
  selectedKitchen.value = null;
};
</script>

<style scoped>
.kitchen-wizard {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  gap: var(--spacing-m); /* Optional: Adds space between children */
}

.action-buttons {
  display: flex;
  gap: var(--spacing-s); /* Space between buttons */
}
</style>
