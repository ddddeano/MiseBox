import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCI0hBgq7dEvCNmIiUVjh7bGd8Vi79dJUk",
    authDomain: 'misebox.app',
    projectId: 'misebox-78f9c',
    storageBucket: 'misebox-78f9c.appspot.com',
    messagingSenderId: '102749723716',
    appId: '1:102749723716:web:8ecc4b081c505e11017011'
  };

  // Initialize Firebase app and services
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // No user signed in, proceed with anonymous sign-in
    signInAnonymously(auth)
      .then(({ user }) => {
      })
      .catch((error) => {
      });
  } else {
  }
});

const firestore = getFirestore(firebaseApp); // Initialize Firestore

  // Provide firebase auth and firestore to Nuxt context
  return {
    provide: {
      firebase: {
        auth,
        firestore
      }
    }
  };
});
