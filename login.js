// ✅ Correct Firebase import with closing quote
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Element references
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btn-text');
const errorMsg = document.getElementById('error-msg');

// ✅ Login form submit handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorMsg.textContent = "";

  spinner.classList.remove('hidden');
  btnText.textContent = "Logging in...";
  loginBtn.disabled = true;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    errorMsg.textContent = "Invalid email or password. Please try again.";
  }

  spinner.classList.add('hidden');
  btnText.textContent = "Login";
  loginBtn.disabled = false;
});

// ✅ Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
