<template>
  <div class="app-link">
    <NuxtLink
      :to="`/${app}/${userId}`"
      class="btn"
      :style="{
        'background-color': getAppStyle.backgroundColor,
        'color': getAppStyle.textColor,
        'border-color': getAppStyle.borderColor
      }"
    >
      {{ appText }} <!-- Dynamic text based on the app -->
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  app: String, 
  userId: String, 
});

const palette = getPalette(props.app); 

// Use the global theme from your theme composable
const { currentTheme } = useTheme(); 

// Computed property to dynamically change the style based on the theme
const getAppStyle = computed(() => {
  if (!palette) {
    return {
      backgroundColor: 'red', // Default background color
      textColor: 'white', // Default text color
      borderColor: 'red' // Default border color
    };
  }

  const themePalette = currentTheme.value === 'light' ? palette.light : palette.dark;
  
  return {
    backgroundColor: themePalette.background,
    textColor: themePalette.text,
    borderColor: themePalette.border
  };
});

// Computed property for dynamic text based on the app name
const appText = computed(() => {
  switch (props.app) {
    case 'misebox-users':
      return 'Configure Your Misebox User Account';
    case 'professionals':
      return 'Polish your Portfolio';
    case 'chefs':
      return 'Manage your Kitchen!';
    default:
      return 'Welcome to Misebox'; // Fallback text
  }
});
</script>

<style scoped>
.app-link {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.btn {
  display: block;
  padding: 10px;
  border: 2px solid; /* This allows the border color to change dynamically */
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Smooth transitions */
}
</style>
