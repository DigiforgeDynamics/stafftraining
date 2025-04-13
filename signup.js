
  import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const signupForm = document.getElementById('signup-form');
const signupError = document.getElementById('signup-error-message');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      signupError.textContent = `Error: ${error.message}`;
    });
});
