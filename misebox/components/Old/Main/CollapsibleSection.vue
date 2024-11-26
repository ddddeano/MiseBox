<template>
  <div class="collapsible-section">
    <div class="section-header" @click="toggleSection">
      <h3>{{ title }}</h3>
      <span>{{ isOpen ? '−' : '+' }}</span>
    </div>
    <div v-show="isOpen" class="section-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(true);

const toggleSection = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.collapsible-section {
  border: 1px solid var(--border-color);
  border-radius: var(--corner-radius-medium);
  background-color: var(--background-secondary);
  margin-bottom: var(--margin-medium);
}

.section-header {
  padding: var(--padding-small);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--background-highlight);
  border-bottom: 1px solid var(--border-color-muted);
  border-radius: var(--corner-radius-medium) var(--corner-radius-medium) 0 0;
}

.section-header h3 {
  margin: 0;
  font-size: var(--font-size-medium);
}

.section-content {
  padding: var(--padding-small);
}
</style>
