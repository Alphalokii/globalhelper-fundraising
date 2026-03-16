import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration - REAL CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyB4g4qfuLxNbQWKlqiokONOZyYhuSj_yQc",
  authDomain: "globalhelper-donation.firebaseapp.com",
  projectId: "globalhelper-donation",
  storageBucket: "globalhelper-donation.firebasestorage.app",
  messagingSenderId: "965784423615",
  appId: "1:965784423615:web:97d50268388887f0418a0a",
  measurementId: "G-346HYSSW2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };

// Firebase collections
export const COLLECTIONS = {
  NEWS: 'news',
  USERS: 'users',
  DONATIONS: 'donations',
  CAMPAIGNS: 'campaigns',
  AI_INSIGHTS: 'ai_insights'
};
