<template>
  <div
    class="chevron-header"
    @click.stop="toggleExpand"
    :class="{ 'expanded': expanded }"
  >
    <div class="title-text">{{ title }}</div>
    <!-- Using the globally registered icons -->
    <component class="icon" :is="iconName" />
  </div>
</template>

<script setup>
// Props and emit definitions
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle']);

// Method to emit toggle event
const toggleExpand = () => {
  emit('toggle', !props.expanded);
};

// Computed property to determine which icon to use
const iconName = computed(() => (props.expanded ? 'ChevronDownIcon' : 'ChevronRightIcon'));
</script>

<style scoped>
.chevron-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 9px;
  border-radius: 8px;
  background-color: var(--background-secondary); 
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, margin-bottom 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Add margin-bottom when expanded */
.chevron-header.expanded {
  margin-bottom: 5px;
}

.title-wrapper:hover {
  background-color: var(--background-secondary-hover); 
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
}

.title-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary); /* Using a variable for text color */
}
</style>
