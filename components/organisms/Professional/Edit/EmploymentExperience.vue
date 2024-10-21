<template>
  <div class="employment-experience-form">
    <div v-if="mode === 'display'">
      <p>{{ experience.role }} at {{ experience.place_name }} ({{ experience.from_year }} - {{ experience.to_year }})</p>
      <p>{{ experience.formatted_address }}</p>
      <p><strong>Responsibilities:</strong> {{ experience.responsibilities }}</p>
    </div>

    <div v-else>
      <input
        v-model="experience.role"
        placeholder="Role"
        class="editable-input"
      />
      <input
        v-model="experience.place_name"
        placeholder="Place Name"
        class="editable-input"
      />
      <input
        v-model="experience.formatted_address"
        placeholder="Address"
        class="editable-input"
      />
      <input
        v-model="experience.responsibilities"
        placeholder="Responsibilities"
        class="editable-input"
      />
      <input
        v-model="experience.from_year"
        type="number"
        placeholder="From Year"
        class="editable-input"
      />
      <input
        v-model="experience.to_year"
        type="number"
        placeholder="To Year"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  experience: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
