<!-- auth/index -->
<template>
  <div class="auth-container">
    <h1>Welcome to Misebox</h1>
    <p>Please log in or sign up to continue.</p>
    <NuxtLink to="/auth/login" class="auth-button">Login</NuxtLink>
    <NuxtLink to="/auth/signup" class="auth-button">Sign Up</NuxtLink>
  </div>
</template>

<style scoped>
.auth-container {
  text-align: center;
  margin-top: 50px;
}

.auth-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
