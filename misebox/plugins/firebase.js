import { defineNuxtPlugin } from '#app';
import { initializeApp, getApps } from 'firebase/app'; // Import getApps to check existing instances
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(() => {
  // Check if any Firebase apps have been initialized
  let firebaseApp;
  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    // Initialize Firebase only if no apps have been initialized
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    // Use the existing Firebase app
    firebaseApp = getApps()[0];
  }

  // Initialize Firebase services
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  // Ensure anonymous sign-in
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      signInAnonymously(auth).catch((error) => {
        console.error(error);
      });
    }
  });

  // Provide firebase auth and firestore to Nuxt context
  return {
    provide: {
      firebase: {
        auth,
        firestore,
      },
    },
  };
});
