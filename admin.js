  // admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Protect Admin Page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Redirect to login if not logged in
  }
});

// Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// Fetch users from Firestore
async function loadUsers() {
  const tableBody = document.querySelector("#users-section tbody");
  tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {
    const querySnapshot = await getDocs(collection(db, "users")); // "users" collection in Firestore
    tableBody.innerHTML = ""; // Clear after loading

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const row = `
        <tr>
          <td>${user.name || '-'}</td>
          <td>${user.email}</td>
          <td>${user.role || 'Employee'}</td>
          <td>
            <button class="action-btn">Edit</button>
            <button class="action-btn danger">Delete</button>
          </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    if (querySnapshot.empty) {
      tableBody.innerHTML = "<tr><td colspan='4'>No users found.</td></tr>";
    }
  } catch (error) {
    console.error("Error loading users:", error);
    tableBody.innerHTML = "<tr><td colspan='4'>Error loading users.</td></tr>";
  }
}

// Load users when the page loads
loadUsers();
