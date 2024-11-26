<template>
  <div class="login-container">
    <h1>Login</h1>
    <button @click="signInWithGoogle" class="google-btn" :disabled="loading">
      <span v-if="!loading">Log In with Google</span>
      <span v-else>Logging in...</span>
    </button>
    <hr class="divider" />
    <form @submit.prevent="login" novalidate>
      <input v-model="email" type="email" placeholder="Email" required :disabled="loading" />
      <input v-model="password" type="password" placeholder="Password" required :disabled="loading" />
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Log In</span>
        <span v-else>Logging in...</span>
      </button>
    </form>
    <NuxtLink to="/auth/signup">Don't have an account? Sign up.</NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

const login = async () => {
  error.value = null;
  loading.value = true;
  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = result.user;
    console.log('Login successful:', user);

    // Redirect to the user's profile page after login
    router.push(`/misebox-users/${user.uid}`);
  } catch (err) {
    error.value = handleFirebaseError(err.code);
  } finally {
    loading.value = false;
  }
};

const signInWithGoogle = async () => {
  error.value = null;
  loading.value = true;
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;
    console.log('Google login successful:', user);

    // Redirect to the user's profile page after Google login
    router.push(`/misebox-users/${user.uid}`);
  } catch (err) {
    error.value = 'Google login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleFirebaseError = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please provide a valid email.';
    default:
      return 'An error occurred during login. Please try again.';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

input[type="email"], input[type="password"] {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.google-btn {
  background-color: #db4437; /* Google red */
  border: none;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
}

.divider {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin: 10px 0;
}
</style>
