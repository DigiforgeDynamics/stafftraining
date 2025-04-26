// ✅ Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// ✅ Firebase configuration
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
const database = getDatabase(app);

// ✅ Check Admin Authentication
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Not logged in
  } else {
    console.log("Admin logged in:", user.email);
    loadUsers(); // Load dummy user list on login
  }
});

// ✅ Logout Admin
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// ✅ Reference to users data
const usersRef = ref(database, 'users');

// ✅ Fetch users from Firebase Realtime Database
function fetchUsers() {
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val(); // Retrieve data as JSON
        displayUsers(users);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// ✅ Display users in the admin dashboard
function displayUsers(users) {
  const usersTableBody = document.querySelector("#users-section tbody");
  usersTableBody.innerHTML = '';

  for (const userId in users) {
    const user = users[userId];
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button onclick="deleteUser('${userId}')" class="delete-btn">Delete</button></td>
      </tr>
    `;
    usersTableBody.insertAdjacentHTML('beforeend', row);
  }
}

// ✅ Delete User (dummy logic)
window.deleteUser = function(userId) {
  const userRef = ref(database, 'users/' + userId);
  userRef.remove()
    .then(() => {
      alert("User deleted successfully.");
      fetchUsers(); // Refresh user list
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
};

// ✅ Add New User (dummy logic)
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (name && email && role) {
    const newUser = {
      name,
      email,
      role
    };

    // Here we would add the user to the Firebase Realtime Database
    // Add user logic goes here...

    alert(`User "${name}" added successfully!`);
    addUserForm.reset();
    fetchUsers(); // Refresh user list
  }
});

// ✅ Create New Course (simulation)
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();

  if (title && description && videoUrl) {
    alert(`Course "${title}" created successfully!`);
    createCourseForm.reset();
    // Add Firestore logic to save course data
  }
});

// Fetch users when the page loads
window.onload = fetchUsers;
