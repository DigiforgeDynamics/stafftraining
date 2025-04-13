// authGuard.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is signed in, redirect to login
    window.location.href = "index.html";
  }
});
