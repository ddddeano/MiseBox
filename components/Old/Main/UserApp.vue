<template>
  <div class="app-item">
    <img :src="app.icon" alt="app icon" class="app-icon" />
    <div class="app-name">{{ app.name }}</div>
    <div class="app-motto">{{ app.motto }}</div>
    <button class="app-button" @click="$emit('action')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Define props for the app and button text
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Basic app-item styling */
.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 150px;
  height: 150px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* App icon styling */
.app-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

/* App name styling */
.app-name {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
}

/* App motto styling */
.app-motto {
  font-size: 0.9em;
  color: var(--text-muted);
  margin-bottom: 10px;
}

/* Button styling */
.app-button {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--text-color-inverse);
  border: none;
}

.app-button:hover {
  background-color: var(--hover-color);
}
</style>
