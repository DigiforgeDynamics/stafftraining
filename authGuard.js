// authGuard.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { app } from './firebase.js'; // firebase.js should be in the same folder

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login page if not authenticated
    window.location.href = "index.html";
  }
});
