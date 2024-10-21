<template>
  <div class="certification-form">
    <div v-if="mode === 'display'">
      <p>{{ certification.name }} - {{ certification.issuing_organization }} ({{ certification.year }})</p>
    </div>

    <div v-else>
      <input
        v-model="certification.name"
        placeholder="Certification Name"
        class="editable-input"
      />
      <input
        v-model="certification.issuing_organization"
        placeholder="Issuing Organization"
        class="editable-input"
      />
      <input
        v-model="certification.year"
        placeholder="Year"
        class="editable-input"
        type="number"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  certification: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
