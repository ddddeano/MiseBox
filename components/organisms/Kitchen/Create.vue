<!-- components/organisms/Kitchen/Create.vue -->
<template>
  <div class="wizard">
    <h2>Find or Create a Kitchen</h2>

    <!-- Search for Kitchens -->
    <OrganismsKitchenSearch
      v-if="!hasKeys"
      @select-kitchen="handleSelectKitchen"
      class="wizard-search"
    />

    <!-- Selected Kitchen Cell -->
    <div
      v-if="kitchen.source === 'google' || kitchen.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsKitchenCell :kitchen="kitchen" :isDisabled="true" />
    </div>

    <!-- Manual Input -->
    <div v-if="kitchen.source === 'manual' || !kitchen.source" class="wizard-manual">
      <div class="wizard-divider" v-if="kitchen.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="kitchenName"
        placeholder="Enter the kitchen name..."
        :value="kitchen.name || ''"
        @update:value="(value) => (kitchen.name = value)"
      />
    </div>

    <!-- Action Buttons -->
    <div class="wizard-actions" v-if="hasKeys">
      <button class="wizard-btn" @click="processKitchen">
        {{ kitchen.source ? "Use Selected Kitchen" : "Create Kitchen" }}
      </button>
      <button class="wizard-btn" @click="clearKitchen">Clear</button>
    </div>
  </div>
</template>

<script setup>
const kitchen = ref({});
const { createKitchen } = useKitchen();
const router = useRouter();

const hasKeys = computed(() => Object.keys(kitchen.value).length > 0);

function handleSelectKitchen(selected) {
  kitchen.value = selected; // Set the selected kitchen
}

async function processKitchen() {
  const kitchenId = await createKitchen(kitchen.value); // Save kitchen and get ID
  router.push(`/kitchens/${kitchenId}`); // Navigate to the kitchen's detail page
}

function clearKitchen() {
  kitchen.value = {}; // Reset the kitchen object
}
</script>

<style scoped>
/* Shared or scoped styles as required */
</style>
