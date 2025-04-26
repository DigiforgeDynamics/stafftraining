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
const db = getDatabase();

// Wait for Firebase Auth to determine the current user
onAuthStateChanged(auth, (user) => {
  const loader = document.getElementById('loader');
  const container = document.querySelector('.container');

  if (loader) loader.style.display = "block"; // Show loader while waiting
  if (container) container.style.display = "none"; // Hide container while loading

  if (user) {
    // User is authenticated, check user role
    const userRef = ref(db, 'users/' + user.uid);  // Get the user's data from Realtime DB
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        // Check if the user is an admin
        if (userData.role === 'admin') {
          // User is admin, show the admin page
          if (loader) loader.style.display = "none";  // Hide loader
          if (container) container.style.display = "block";  // Show content
        } else {
          // User is not admin, redirect to the regular user page
          if (loader) loader.style.display = "none";  // Hide loader before redirecting
          window.location.href = "index.html"; // Redirect to regular user page
        }
      } else {
        // No user data found, redirect to login
        if (loader) loader.style.display = "none";  // Hide loader before redirecting
        window.location.href = "index.html"; // Redirect to login
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
      if (loader) loader.style.display = "none";  // Hide loader in case of error
      window.location.href = "index.html"; // Redirect to login if error occurs
    });
  } else {
    // Not authenticated, redirect to login
    if (loader) loader.style.display = "none";  // Hide loader before redirecting
    window.location.href = "index.html"; // Redirect to login
  }
});
