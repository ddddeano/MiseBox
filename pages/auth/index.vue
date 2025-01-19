<!-- pages/auth/index.vue -->
<template>
  <div class="auth-page">
    <div v-if="currentUser && !currentUser.isAnonymous">
      <!-- Sign out button -->
      <button @click="handleLogout" class="btn btn-primary sign-out-button">Sign Out</button>
    </div>
    <div class="auth-container" v-else>
      <OrganismsAuth />
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire';
import { useRouter } from 'vue-router';

// Access current user data from Vuefire
const currentUser = useCurrentUser();
const { logout } = useAuth();
const router = useRouter();

// Handle the logout process and redirect
const handleLogout = async () => {
  try {
    await logout();
    router.push('/'); // Redirect to home or relevant page after logout
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-xxs);
  margin: 0;
}

.auth-container {
  width: 100%;
  max-width: 600px;
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
