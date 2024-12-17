<!-- components/molecules/UserAppIcon.vue -->
<template>
  <div :class="['app-icon', appTypeClass]">
    <span>{{ app[0].toUpperCase() }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  app: {
    type: String,
    required: true,
  },
});

// Define class based on the app type
const appTypeClass = computed(() => {
  if (props.app.toLowerCase() === 'chefs') {
    return 'chef-icon';
  } else if (props.app.toLowerCase() === 'professionals') {
    return 'professional-icon';
  }
  return '';
});
</script>

<style scoped>
/* Base app-icon styles */
.app-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border); /* Default to border */
  font-weight: bold;
  font-size: 16px;
  border-radius: var(--radius-s);
  margin: var(--spacing-xxs);
  transition: transform 0.2s ease;
  background-color: var(--primary); /* Default to primary */
  color: var(--text-primary); /* Default to text-primary */
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-l);
  } 
}

/* Chef-specific styles (red color) */
.chef-icon {
  background-color: #ff4d4d; /* Override with red for chefs */
  color: white;
  border-color: #844c4c;
}

/* Professional-specific styles (green color) */
.professional-icon {
  background-color: #4caf50; /* Override with green for professionals */
  color: white;
  border-color: #436044;
}
</style>
