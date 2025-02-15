import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL2ifXE4FIt9RTx4FOyBOBc-dtvsklxyM",
    authDomain: "staff-training-111cb.firebaseapp.com",
    projectId: "staff-training-111cb",
    storageBucket: "staff-training-111cb.appspot.com",
    messagingSenderId: "352195540005",
    appId: "1:352195540005:web:18cbc5c93781f199eebbcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Function
document.getElementById("login-btn").addEventListener("click", () => {
    let email = document.getElementById("employee-id").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});

// Register Function
document.getElementById("register-btn").addEventListener("click", () => {
    let email = document.getElementById("new-email").value;
    let password = document.getElementById("new-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration successful! Please log in.");
        })
        .catch((error) => {
            alert("Registration failed: " + error.message);
        });
});
