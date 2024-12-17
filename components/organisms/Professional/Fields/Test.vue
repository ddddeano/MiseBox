<!-- components/organisms/Professional/Fields/Test.vue -->
<template>
  <div>
    <!-- Display Mode -->
    <div v-if="mode === 'display'">
      {{ experience }}

      <p>{{ formatDate(experience.date) }}</p>
    </div>

    <!-- Edit Mode -->
    <div v-else-if="mode === 'edit'">
      {{ experience }}

      <label for="edit-date">Edit Date</label>
      <input
        type="date"
        id="edit-date"
        v-model="formattedDate"
        @input="updateDate"
      />
    </div>

    <!-- Create Mode -->
    <div v-else-if="mode === 'create'">
      {{ experience }}
      <label for="create-date">Create Date</label>
      <input
        type="date"
        id="create-date"
        v-model="formattedDate"
        @input="updateDate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { format, parseISO } from 'date-fns';

const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['display', 'edit', 'create'].includes(value),
  },
});

// Initialize formattedDate for date input in 'edit' and 'create' modes
const formattedDate = ref('');

// Watch for changes in the experience date field
watch(
  () => props.experience.date,
  (newDate) => {
    if (newDate && newDate instanceof Date) {
      formattedDate.value = format(newDate, 'yyyy-MM-dd'); // Format date as yyyy-MM-dd for input
    } else {
      formattedDate.value = ''; // Ensure empty string if no date is set
    }
  },
  { immediate: true } // Trigger watcher immediately
);

// Function to update the date when the user edits or creates
const updateDate = () => {
  if (formattedDate.value) {
    const parsedDate = parseISO(formattedDate.value); // Parse from ISO string
    props.experience.date = parsedDate; // Update experience object with new Date
  } else {
    props.experience.date = null; // Set to null if date is cleared
  }
};

// Function to format the date for display mode
const formatDate = (date) => {
  return date ? format(new Date(date), 'MMMM dd, yyyy') : 'No Date Set';
};
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
