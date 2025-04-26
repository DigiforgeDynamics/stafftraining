import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

// Wait for Firebase Auth to determine the current user
onAuthStateChanged(auth, (user) => {
  const loader = document.getElementById('loader');
  const container = document.querySelector('.container');

  if (user) {
    // User is authenticated
    if (loader) loader.style.display = "none";
    if (container) container.style.display = "block";
  } else {
    // Not authenticated, redirect to login
    window.location.href = "index.html";
  }
});


