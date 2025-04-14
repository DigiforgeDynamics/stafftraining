import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

const errorMsg = document.getElementById("error-msg");

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorMsg.textContent = ""; // Clear previous error

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    errorMsg.textContent = "Invalid email or password. Please try again.";
  }
});

// Optional: redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
