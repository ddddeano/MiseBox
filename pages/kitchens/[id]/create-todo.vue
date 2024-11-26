<template>
  <client-only>
    <div v-if="kitchen" class="create-todo">
      <!-- Add Task Form -->
      <OrganismsKitchenAddTaskForm
        v-if="tasksCollectionRef"
        :tasksCollectionRef="tasksCollectionRef"
        @task-added="handleTaskAdded"
      />

      <h1>Create Todo List</h1>

      <!-- Task List -->
      <ul v-if="tasks.length" class="tasks-list">
        <OrganismsKitchenTaskListItemCell
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          mode="todo"
          @toggle="toggleTaskState"
        />
      </ul>

      <p v-else class="no-tasks-message">
        No tasks available to add to the todo list.
      </p>

      <!-- Save Todo Button -->
      <button
        v-if="tasks.some((task) => task.state === 'to do')"
        class="btn btn-primary btn-pill"
        @click="saveTodoList"
      >
        Save Todo List
      </button>
    </div>

    <div v-else>
      <p>Loading kitchen information...</p>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument, useCollection } from 'vuefire';
import { doc, collection, updateDoc } from 'firebase/firestore';
import { useFirestore, useCurrentUser } from 'vuefire';

const route = useRoute();
const db = useFirestore();
const currentUser = useCurrentUser();

// Route parameter for the kitchen ID
const kitchenId = computed(() => route.params.id);

// Firestore document reference for the kitchen
const kitchenDocRef = computed(() =>
  currentUser.value && kitchenId.value ? doc(db, 'kitchens', kitchenId.value) : null
);

// Fetch the kitchen document
const { data: kitchen } = useDocument(kitchenDocRef);

// Firestore collection reference for tasks
const tasksCollectionRef = computed(() =>
  currentUser.value && kitchenDocRef.value ? collection(kitchenDocRef.value, 'tasks') : null
);

// Fetch tasks from the collection
const { data: tasks } = useCollection(tasksCollectionRef);

// Handle task addition
const handleTaskAdded = (taskName) => {
  console.log(`Task "${taskName}" added.`);
};

// Toggle task state
const toggleTaskState = async (task) => {
  if (!currentUser.value || !task || !tasksCollectionRef.value) return;

  const taskDocRef = doc(tasksCollectionRef.value, task.id);
  const newState = task.state === 'to do' ? 'done' : 'to do';

  try {
    await updateDoc(taskDocRef, { state: newState });
    task.state = newState; // Update local state for UI
  } catch (error) {
    console.error('Error toggling task state:', error);
  }
};

// Save the todo list
const saveTodoList = async () => {
  if (!currentUser.value) return;

  try {
    const tasksToDo = tasks.filter((task) => task.state === 'to do');
    console.log(`Todo list saved with ${tasksToDo.length} tasks.`);
  } catch (error) {
    console.error('Error saving todo list:', error);
  }
};
</script>

<style scoped>
.create-todo {
  margin-top: var(--spacing-m);
  text-align: center;
}

.tasks-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-m) 0;
}

.no-tasks-message {
  text-align: center;
  color: var(--text-secondary);
}

.btn {
  margin-top: var(--spacing-l);
}
</style>
