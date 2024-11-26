<template>
  <div class="workflow-form">
    <div v-if="mode === 'display'">
      <p><strong>Task:</strong> {{ workflow.task }}</p>
      <p><strong>Status:</strong> {{ workflow.status }}</p>
      <p><strong>Due Date:</strong> {{ workflow.dueDate }}</p>
    </div>

    <div v-else>
      <input
        v-model="workflow.task"
        placeholder="Task"
        class="editable-input"
      />
      <input
        v-model="workflow.status"
        placeholder="Status"
        class="editable-input"
      />
      <input
        v-model="workflow.dueDate"
        type="date"
        class="editable-input"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  workflow: Object,
  mode: {
    type: String,
    default: 'display',
  },
});
</script>
