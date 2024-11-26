<template>
  <select v-model="selectedYear" @change="emitUpdatedYear">
    <option value="" disabled>Select a year</option>
    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';
import { setYear } from 'date-fns';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  }
});

const emit = defineEmits(['update:modelValue']);

// Generate an array of years from 100 years ago until today
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

// Local state for selected year
const selectedYear = ref(props.modelValue ? props.modelValue.getFullYear() : null);

// Watch for changes in modelValue and update local year accordingly
watch(() => props.modelValue, (newDate) => {
  if (newDate) {
    selectedYear.value = newDate.getFullYear();
  }
});

// Emit the updated Date object
const emitUpdatedYear = () => {
  if (props.modelValue) {
    const updatedDate = setYear(new Date(props.modelValue), selectedYear.value);
    emit('update:modelValue', updatedDate);
  }
};
</script>
