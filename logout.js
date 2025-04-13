  import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
