<template>
  <div class="kitchen-tasks">
    <h2>Task List</h2>

    <!-- Add Task Form -->
    <OrganismsKitchenAddTaskForm
      :tasksCollectionRef="tasksCollectionRef"
      @task-added="handleTaskAdded"
    />

    <!-- Task List -->
    <ul v-if="tasks.length" class="tasks-list">
      <OrganismsKitchenTaskListItemCell
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :kitchenId="kitchenId"
        mode="manage"
        @task-removed="handleTaskRemoved"
        @task-status-changed="handleTaskStatusChanged"
      />
    </ul>

    <p v-else class="no-tasks-message">No tasks added yet.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const props = defineProps({
  kitchenDocRef: {
    type: Object,
    required: true,
  },
  kitchenId: {
    type: String,
    required: true,
  },
});

const tasksCollectionRef = computed(() =>
  props.kitchenDocRef ? collection(props.kitchenDocRef, 'tasks') : null
);

const { data: tasks } = useCollection(tasksCollectionRef);

const handleTaskAdded = (taskName) => {
  console.log(`Task "${taskName}" added.`);
};

const handleTaskRemoved = (taskId) => {
  const index = tasks.value.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
};

const handleTaskStatusChanged = (taskId, newStatus) => {
  const task = tasks.value.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
  }
};
</script>

