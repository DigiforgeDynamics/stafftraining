import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  databaseURL: "https://stafftraining-eef33-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.firebasestorage.app",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const container = document.querySelector('.container');

// Always hide container first (if it exists)
if (container) container.style.display = "none";

// Wait for authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        if (userData.role && userData.role === 'admin') {
          // ✅ Admin confirmed
          if (container) container.style.display = "block";
        } else {
          // 🚫 Not an admin, redirect
          window.location.href = "index.html";
        }
      } else {
        // 🚫 No user data, redirect
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      window.location.href = "index.html";
    }
  } else {
    // 🚫 No user logged in
    window.location.href = "index.html";
  }
});
