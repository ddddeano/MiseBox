<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <button @click="signInWithGoogle" class="google-btn" :disabled="loading">
      <span v-if="!loading">Sign Up with Google</span>
      <span v-else>Signing in...</span>
    </button>
    <hr class="divider" />
    <form @submit.prevent="signup" novalidate>
      <input v-model="email" type="email" placeholder="Email" required :disabled="loading" />
      <input v-model="password" type="password" placeholder="Password" required :disabled="loading" />
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Sign Up with Email</span>
        <span v-else>Signing up...</span>
      </button>
    </form>
    <NuxtLink to="/auth/login">Already have an account? Log in.</NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, EmailAuthProvider, linkWithCredential, linkWithPopup } from 'firebase/auth';

const auth = getAuth();
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter(); // For programmatic navigation
const { createMiseboxUser } = useMiseboxUser(); // Assuming you have this composable function

// Link anonymous user to a new email/password account
const signup = async () => {
  error.value = null;
  loading.value = true;
  try {
    const credential = EmailAuthProvider.credential(email.value, password.value);

    let user;

    if (auth.currentUser?.isAnonymous) {
      // Link the anonymous user to the email/password account
      const result = await linkWithCredential(auth.currentUser, credential);
      user = result.user;
      console.log('Anonymous account linked with email/password');
    } else {
      // Sign up as a new user
      const result = await createUserWithEmailAndPassword(auth, email.value, password.value);
      user = result.user;
      console.log('Signup successful:', user);
    }

    // Only proceed to create the Misebox user after signup succeeds
    if (user) {
      await createMiseboxUser(user);
      // Navigate to the user's basic info page
      router.push(`/misebox-users/${user.uid}/basic-info`);
    }
  } catch (err) {
    console.error('Firebase Error:', err); // Log the Firebase error to the console
    error.value = handleFirebaseError(err.code); // Display user-friendly error
  } finally {
    loading.value = false;
  }
};

// Link anonymous user to a Google account
const signInWithGoogle = async () => {
  error.value = null;
  loading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    let user;

    if (auth.currentUser?.isAnonymous) {
      // Link anonymous user with Google account
      const result = await linkWithPopup(auth.currentUser, provider);
      user = result.user;
      console.log('Anonymous account linked with Google');
    } else {
      // Sign in as a new Google user
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      console.log('Google sign-in successful:', user);
    }

    // Only proceed to create the Misebox user after Google sign-in succeeds
    if (user) {
      await createMiseboxUser(user);
      // Navigate to the user's basic info page
      router.push(`/misebox-users/${user.uid}/basic-info`);
    }
  } catch (err) {
    console.error('Google Sign-in Error:', err); // Log the Google error to the console
    error.value = 'Google sign-in failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Helper function to display more user-friendly Firebase errors
const handleFirebaseError = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email is already in use. Please log in or use a different email.';
    case 'auth/weak-password':
      return 'Password is too weak. It should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please provide a valid email.';
    default:
      return 'An error occurred during sign-up. Please try again.';
  }
};
</script>

<style scoped>
.signup-container {
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
