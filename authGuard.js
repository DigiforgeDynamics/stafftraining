import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
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

  if (user) {
    // User is authenticated
    // Fetch the user's role from Realtime Database
    const userRef = ref(db, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        // Check if the user is an admin
        if (userData.role === 'admin') {
          // User is admin, show the admin page
          if (loader) loader.style.display = "none";
          if (container) container.style.display = "block";
        } else {
          // User is not admin, redirect to regular page
          window.location.href = "index.html";  // or another page for regular users
        }
      } else {
        // No user data found, redirect to login
        window.location.href = "index.html";
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
      window.location.href = "index.html"; // Redirect if there's an error
    });
  } else {
    // Not authenticated, redirect to login
    window.location.href = "index.html";
  }
});
