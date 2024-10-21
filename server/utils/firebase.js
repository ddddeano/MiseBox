// server/utils/firebase.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../../config/service-account.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: cert(serviceAccount),
});

export const firestore = getFirestore(app);
export const auth = getAuth(app); // Export the auth module
export { FieldValue, Timestamp };
