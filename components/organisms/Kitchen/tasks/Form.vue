<!-- components/organisms/Kitchen/tasks/Form.vue -->
<template>
  <form @submit.prevent="addTask" class="task-form">
    <input
      type="text"
      v-model="newTask"
      placeholder="Add a new task"
      class="editable-input"
    />
    <button type="submit" class="btn btn-primary btn-pill">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { addDoc } from 'firebase/firestore';

const props = defineProps({
  tasksCollectionRef: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['task-added']);

const newTask = ref('');

const addTask = async () => {
  if (!newTask.value.trim() || !props.tasksCollectionRef) return;

  try {
    const taskName = newTask.value.trim();
    await addDoc(props.tasksCollectionRef, { name: taskName });
    emit('task-added', taskName);
    newTask.value = ''; // Clear the input field
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Failed to add task. Please try again.');
  }
};
</script>

