<!-- components/organisms/Supplier/Create.vue -->
<template>
  <div class="wizard">
    <h2>Find or Create a Supplier</h2>
    <OrganismsSupplierSearch
      v-if="!hasKeys"
      @select-supplier="handleSelectSupplier"
      class="wizard-search"
    />
    <div
      v-if="supplier.source === 'google' || supplier.source === 'firestore'"
      class="wizard-cell-display"
    >
      <OrganismsSupplierCell :supplier="supplier" :isDisabled="true" />
    </div>
    <div v-if="supplier.source === 'manual' || !supplier.source" class="wizard-manual">
      <div class="wizard-divider" v-if="supplier.source !== 'manual'">
        <span class="wizard-divider-line"></span>
        <span class="wizard-divider-text">Or Enter Manually</span>
        <span class="wizard-divider-line"></span>
      </div>
      <MoleculesFormsSingleFieldLocal
        id="supplierName"
        placeholder="Enter the supplier name..."
        :value="supplier.name || ''"
        @update:value="updateSupplierName"
      />
      <div class="wizard-actions" v-if="hasKeys">
        <button class="wizard-btn" @click="processSupplier">Save Supplier</button>
        <button class="wizard-btn" @click="clearSupplier">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supplier = ref({});
const { createSupplier } = useSupplier();
const router = useRouter();
const currentUser = useCurrentUser();

const hasKeys = computed(() => Object.keys(supplier.value).length > 0);

function handleSelectSupplier(selected) {
  supplier.value = selected;
}

function updateSupplierName(value) {
  supplier.value.name = value;
  supplier.value.source = value.length >= 3 ? "manual" : null;
}

async function processSupplier() {
  await createSupplier(supplier.value);
  router.push(`/suppliers/${currentUser.value?.uid}`);
}

function clearSupplier() {
  supplier.value = {};
}
</script>
