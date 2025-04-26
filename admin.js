import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, push, get, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// When user logs in -> fetch users
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
    fetchUsers();  // 🔥 fetch after login confirmed
  } else {
    window.location.href = "index.html"; // redirect if not logged in
  }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

// Fetch Users
function fetchUsers() {
  const usersRef = ref(db, 'users');
  get(usersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      displayUsers(users);
    } else {
      console.log("No users found.");
      document.getElementById('users-section').innerHTML = "<p>No users found.</p>";
    }
  }).catch((error) => {
    console.error("Error fetching users:", error);
  });
}

// Display Users
function displayUsers(users) {
  const tbody = document.querySelector("#users-section tbody");
  tbody.innerHTML = "";
  Object.keys(users).forEach((key) => {
    const user = users[key];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><button class="delete-btn" onclick="deleteUser('${key}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete User
window.deleteUser = function(userKey) {
  const userRef = ref(db, 'users/' + userKey);
  remove(userRef)
    .then(() => {
      console.log('User deleted');
      fetchUsers(); // reload after deletion
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}

// Add User
document.getElementById('add-user-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;
  if (name && email && role) {
    const usersRef = ref(db, 'users');
    push(usersRef, { name, email, role }).then(() => {
      fetchUsers(); // refresh
      document.getElementById('add-user-form').reset();
    });
  }
});

// Create Course (similar logic)
document.getElementById('create-course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();
  if (title && description && videoUrl) {
    const coursesRef = ref(db, 'courses');
    push(coursesRef, { title, description, videoUrl }).then(() => {
      alert('Course created successfully!');
      document.getElementById('create-course-form').reset();
    });
  }
});
