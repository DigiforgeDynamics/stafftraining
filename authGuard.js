import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show the loading spinner
const showLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
};

// Hide the loading spinner
const hideLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};

// Function to check if user is authenticated
function authGuard() {
  showLoader(); // Show loader while checking auth

  // Get the body or the content of the page
  const pageContent = document.getElementById("page-content");
  pageContent.style.display = "none"; // Hide page content initially

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // If not authenticated, redirect to login page
      window.location.href = "index.html";
    } else {
      // If authenticated, show the page content
      pageContent.style.display = "block";
      hideLoader(); // Hide loader
    }
  });
}

// Call the authGuard function to protect pages
authGuard();
