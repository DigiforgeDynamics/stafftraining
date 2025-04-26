import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

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
const database = getDatabase(app);

// Elements
const loader = document.getElementById('loader');
const container = document.querySelector('.container');

// Hide container by default
if (container) container.style.display = "none";

// Start checking authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${user.uid}`));

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const role = userData.role || "employee"; // default to employee if role not found

        if (role === "admin") {
          // ✅ User is admin
          if (loader) loader.style.display = "none";
          if (container) container.style.display = "block";
        } else {
          // 🚫 Not admin
          window.location.href = "index.html";
        }
      } else {
        // 🚫 No user record in DB
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error verifying admin role:", error);
      window.location.href = "index.html";
    }
  } else {
    // 🚫 User not logged in
    window.location.href = "index.html";
  }
});
