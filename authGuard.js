import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Correct Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  databaseURL: "https://stafftraining-eef33-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Wait for Firebase Auth to determine the current user
onAuthStateChanged(auth, (user) => {
  const loader = document.getElementById('loader');
  const container = document.querySelector('.container');

  if (user) {
    // User is authenticated, now check their role
    const dbRef = ref(database);
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const role = userData.role || "employee"; // default to employee

        if (role === "admin") {
          // Admin: allow access
          if (loader) loader.style.display = "none";
          if (container) container.style.display = "block";
        } else {
          // Not admin: redirect safely
          window.location.href = "employee-home.html";
        }
      } else {
        // No user data, treat as unauthorized
        signOut(auth).then(() => {
          window.location.href = "index.html";
        });
      }
    }).catch((error) => {
      console.error("Error fetching user role:", error);
      signOut(auth).then(() => {
        window.location.href = "index.html";
      });
    });

  } else {
    // Not authenticated, redirect to login
    window.location.href = "index.html";
  }
});
