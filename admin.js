// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  databaseURL: "https://stafftraining-eef33-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// =========================
// USER MANAGEMENT FUNCTIONS
// =========================

// Fetch and display all users
function fetchUsers() {
  const usersRef = ref(database, 'users');

  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        displayUsers(users);
      } else {
        document.getElementById("users-table").innerHTML = "<tr><td colspan='4'>No users found.</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

// Display users in the table
function displayUsers(users) {
  const usersTable = document.getElementById("users-table");
  usersTable.innerHTML = ""; // Clear old data

  for (const userId in users) {
    const user = users[userId];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><button class="delete-btn" onclick="deleteUser('${userId}')">Delete</button></td>
    `;

    usersTable.appendChild(row);
  }
}

// Add a new user
function addUser(name, email, role) {
  const usersRef = ref(database, 'users');
  const userId = generateUniqueId();

  const userData = {
    name: name,
    email: email,
    role: role
  };

  set(ref(database, 'users/' + userId), userData)
    .then(() => {
      alert("User added successfully!");
      fetchUsers();
      document.getElementById("add-user-form").reset();
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}

// Delete a user
window.deleteUser = function(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    const userRef = ref(database, `users/${userId}`);

    remove(userRef)
      .then(() => {
        alert("User deleted successfully!");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
}

// Generate a unique ID (could also use Firebase push IDs or custom IDs)
function generateUniqueId() {
  return 'user-' + Date.now();
}

// =========================
// EVENT LISTENERS
// =========================

// Add user form submission
document.getElementById("add-user-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value.trim();

  if (name && email && role) {
    addUser(name, email, role);
  } else {
    alert("Please fill in all fields.");
  }
});

// Fetch users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);
