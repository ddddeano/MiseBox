import { defineNuxtPlugin } from '#app';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  // Reactively track the authentication state
  if (import.meta.client) {
    onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed.');
      if (user) {
        console.log(`User ID: ${user.uid}`);
      } else {
        console.log('No user currently signed in.');
      }
    });
  }

  return {
    provide: {
      firebase: {
        auth,
      },
    },
  };
});
