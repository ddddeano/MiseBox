// composables/Authentication/useAuth.js
import { ref } from "vue";
import { useRouter, useNuxtApp } from "#app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const user = ref(null);
const loading = ref(false);
const error = ref(null);

export function useAuth() {
  const router = useRouter();
  const { $firebase } = useNuxtApp();
  const auth = $firebase.auth;

  const { createMiseboxUser } = useMiseboxUser(); // Destructure createMiseboxUser function

  // User info to pass to createMiseboxUser
  const userInfo = {};

  const successfulSignUp = async () => {
    try {
      // Pass userInfo containing email or other properties to createMiseboxUser
      await createMiseboxUser(userInfo);
      if (auth.currentUser) {
        router.push(`/misebox-users/${auth.currentUser.uid}/edit`);
      }
    } catch (err) {
      console.error("Error during successfulSignUp:", err);
      throw err;
    }
  };

  const successfulSignIn = () => {
    if (auth.currentUser) {
      router.push(`/misebox-users/${auth.currentUser.uid}`);
    }
  };

  const signUp = async (email, password) => {
    loading.value = true;
    error.value = null; // Reset any previous error
    try {
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        await signOut(auth);
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);
      user.value = result.user;

      // Populate userInfo with email
      userInfo.email = email;

      await successfulSignUp();
    } catch (err) {
      error.value = handleFirebaseError(err.code);
      console.error("Sign-up error:", err);
    } finally {
      loading.value = false;
    }
  };

  const logIn = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        await signOut(auth);
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      user.value = result.user;
      successfulSignIn();
    } catch (err) {
      error.value = handleFirebaseError(err.code);
      console.error("Login error:", err);
    } finally {
      loading.value = false;
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    loading.value = true;
    error.value = null;
    try {
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        await signOut(auth);
      }
      const result = await signInWithPopup(auth, provider);
      user.value = result.user;

      // Populate userInfo with email from Google account
      userInfo.email = result.user.email;

      successfulSignIn();
    } catch (err) {
      error.value = "Google sign-in failed. Please try again.";
      console.error("Google Sign-In Error:", err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      router.push("/auth");
    } catch (err) {
      error.value = "Error logging out.";
      console.error(err);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already in use. Please log in or use a different email.";
      case "auth/weak-password":
        return "Password is too weak. It should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address. Please provide a valid email.";
      case "auth/user-not-found":
        return "User not found. Please check your credentials or sign up.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    logIn,
    googleSignIn,
    logout,
  };
}
