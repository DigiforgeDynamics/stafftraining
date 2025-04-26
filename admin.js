// ✅ Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// ✅ Your Firebase configuration
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

// ✅ Simulate User List (You can replace with real database)
const usersTableBody = document.querySelector("#users-section tbody");

const dummyUsers = [
  { name: "John Doe", email: "john@example.com", role: "Employee" },
  { name: "Jane Smith", email: "jane@example.com", role: "Admin" },
];

function loadUsers() {
  usersTableBody.innerHTML = "";
  dummyUsers.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button onclick="deleteUser(${index})" class="delete-btn">Delete</button></td>
      </tr>
    `;
    usersTableBody.insertAdjacentHTML('beforeend', row);
  });
}

// ✅ Delete Dummy User
window.deleteUser = function(index) {
  dummyUsers.splice(index, 1);
  loadUsers();
}

// ✅ Add New User (Simulation)
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (name && email && role) {
    dummyUsers.push({ name, email, role });
    loadUsers();
    addUserForm.reset();
  }
});

// ✅ Create New Course (Simulation)
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();

  if (title && description && videoUrl) {
    alert(`Course "${title}" created successfully!`);
    createCourseForm.reset();
    // Here you can add Firestore Database Insertion Logic
  }
});
