<template>
  <div class="supplier-form">
    <div v-if="mode === 'display'">
      <p><strong>Supplier Name:</strong> {{ supplier.name }}</p>
    </div>

    <div v-else>
      <input
        v-model="supplier.name"
        placeholder="Supplier Name"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  supplier: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
