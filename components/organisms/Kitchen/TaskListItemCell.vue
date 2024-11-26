<template>
  <li class="task-item">
    <button
      class="task-toggle"
      :class="task.status"
      @click="changeStatus"
    >
      {{ task.name }}
    </button>
  </li>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  kitchenId: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: 'view', // Could be 'view', 'manage', etc.
  },
});

const emit = defineEmits(['task-status-changed', 'task-removed']);
const db = useFirestore();

const changeStatus = async () => {
  if (!props.task || !props.kitchenId) return;

  const taskDocRef = doc(db, `kitchens/${props.kitchenId}/tasks`, props.task.id);
  const newStatus = getNextStatus(props.task.status);

  try {
    await updateDoc(taskDocRef, { status: newStatus });
    emit('task-status-changed', props.task.id, newStatus);
  } catch (error) {
    console.error('Error changing task status:', error);
  }
};

const getNextStatus = (currentStatus) => {
  const statusOrder = ['dormant', 'to do', 'done', 'checked'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  return statusOrder[(currentIndex + 1) % statusOrder.length];
};
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-s);
}

.task-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--spacing-s);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
}

.task-toggle.dormant {
  background-color: lightgray;
  color: black;
}

.task-toggle.to-do {
  background-color: yellow;
  color: black;
}

.task-toggle.done {
  background-color: lightgreen;
  color: black;
}

.task-toggle.checked {
  background-color: lightblue;
  color: black;
}

.task-toggle:hover {
  opacity: 0.8;
}
</style>
