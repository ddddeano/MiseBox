<template>
  <div class="availability-form">
    <div v-if="mode === 'display'">
      <p><strong>Date:</strong> {{ availability.date }}</p>
      <p><strong>Status:</strong> {{ availability.status }}</p>
    </div>

    <div v-else>
      <input
        v-model="availability.date"
        type="date"
        placeholder="Availability Date"
        class="editable-input"
      />
      <select v-model="availability.status" class="editable-input">
        <option value="Available">Available</option>
        <option value="Booked">Booked</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  availability: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
