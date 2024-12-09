<template>
  <div class="availability-form">
    <!-- Display Mode -->
    <div v-if="mode === 'display'" class="display-mode">
      <p>{{ availability.day }}: {{ availability.time_from }} - {{ availability.time_to }}</p>
    </div>

    <!-- Create/Edit Mode -->
    <div v-else>
      <label>Day</label>
      <select v-model="availability.day">
        <option disabled value="">Select Day</option>
        <option v-for="day in daysOfWeek" :key="day" :value="day">{{ day }}</option>
      </select>

      <label>From</label>
      <input type="time" v-model="availability.time_from" />

      <label>To</label>
      <input type="time" v-model="availability.time_to" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  availability: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
</script>

<style scoped>
/* Add any necessary styles */
</style>
