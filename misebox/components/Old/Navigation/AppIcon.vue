<template>
  <div class="navigation-app-icon">
    <p>{{ name }}</p>
    <div class="icon-wrapper">
      <img :src="icon" alt="App Icon" class="app-icon">
    </div>
    <div class="app-details">
      <p>{{ motto }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  icon: String,
  motto: String
});
</script>

<style scoped>
.navigation-app-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #004225;
}

.icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 4px solid transparent; /* Transparent border */
}

.app-icon {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the icon covers the dimensions */
}

.app-details {
  text-align: center;
}

.app-details p {
  font-size: 0.9rem; /* Adjust font size as needed */
  margin-bottom: 5px;
}
</style>
