<template>
  <div class="education-form">
    <div v-if="mode === 'display'">
      <p>{{ education.institution }} - {{ education.degree }} ({{ education.from_year }} - {{ education.to_year }})</p>
    </div>

    <div v-else>
      <input
        v-model="education.institution"
        placeholder="Institution"
        class="editable-input"
      />
      <input
        v-model="education.degree"
        placeholder="Degree"
        class="editable-input"
      />
      <input
        v-model="education.from_year"
        type="number"
        placeholder="From Year"
        class="editable-input"
      />
      <input
        v-model="education.to_year"
        type="number"
        placeholder="To Year"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  education: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
