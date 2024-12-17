<!-- pages/auth/index.vue -->
<template>
  <div class="auth-page">
    <div v-if="currentUser && !currentUser.isAnonymous">
      <!-- Sign out button -->
      <button @click="logout" class="btn btn-primary sign-out-button">Sign Out</button>
    </div>
    <div class="auth-container" v-else>
      <OrganismsAuth />
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';

// Access current user data from Vuefire
const currentUser = useCurrentUser();
const { logout } = useAuth(); // Import the logout function from useAuth composable
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure full width */
  min-height: 100vh; /* Full screen height */
  background: linear-gradient(135deg, var(--background-1), var(--background-2));
  padding: var(--spacing-l);
  margin: 0; /* Remove any default margins */
}

.auth-container {
  width: 100%; /* Full width on mobile */
  max-width: 600px; /* Increase max width for larger screens */
}

.sign-out-button {
  margin-top: var(--spacing-m);
  padding: var(--spacing-s) var(--spacing-m);
  font-size: var(--font-size-m);
  cursor: pointer;
  border: none;
  border-radius: var(--radius-s);
  background-color: var(--primary);
  color: #fff;
}

.sign-out-button:hover {
  background-color: var(--primary-hover);
}
</style>
