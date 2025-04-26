import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

// Firebase config (make sure it's the same as in your other files)
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

// Check user authentication state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is authenticated, redirect to the login page (index.html)
    window.location.href = "index.html";
  }
});
    

document.querySelectorAll(".collapsible-header").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});

const links = document.querySelectorAll(".collapsible-content a");
let visitedCount = 0;
const totalLinks = links.length;

links.forEach((link) => {
  const key = `visited-${link.href}`;
  if (localStorage.getItem(key)) {
    link.classList.add("visited");
    visitedCount++;
  }

  link.addEventListener("click", () => {
    localStorage.setItem(key, "true");
    link.classList.add("visited");
  });
});

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  const visitedLinks = document.querySelectorAll(".visited").length;
  const progress = Math.floor((visitedLinks / totalLinks) * 100);
  bar.style.width = `${progress}%`;
}

updateProgressBar();


