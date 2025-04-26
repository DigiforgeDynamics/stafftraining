import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btn-text');
const errorMsg = document.getElementById('error-msg');

// 🔐 Role-based redirect after login
async function redirectToDashboard(user) {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const role = docSnap.data().role;
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    errorMsg.textContent = "No role assigned to this user.";
    await auth.signOut();
  }
}

// Submit handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorMsg.textContent = "";

  spinner.classList.remove('hidden');
  btnText.textContent = "Logging in...";
  loginBtn.disabled = true;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await redirectToDashboard(userCredential.user);
  } catch (error) {
    errorMsg.textContent = "Invalid email or password. Please try again.";
  }

  spinner.classList.add('hidden');
  btnText.textContent = "Login";
  loginBtn.disabled = false;
});

// Auto redirect if already logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await redirectToDashboard(user);
  }
});
