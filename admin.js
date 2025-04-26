// ✅ Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get, set, push, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
  projectId: "stafftraining-eef33",
  storageBucket: "stafftraining-eef33.appspot.com",
  messagingSenderId: "912734544923",
  appId: "1:912734544923:web:0d52ee5deb49e6380a04be",
  measurementId: "G-3XY8E8XVT2",
  databaseURL: "https://stafftraining-eef33-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ✅ Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// ✅ Auth State Check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Redirect if not logged in
  } else {
    fetchUsers(); // Load users if logged in
  }
});

// ✅ Fetch Users
function fetchUsers() {
  const usersRef = ref(database, 'users');
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        displayUsers(users);
      } else {
        document.getElementById("users-table").innerHTML = "<tr><td colspan='4'>No users found</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

// ✅ Display Users
function displayUsers(users) {
  const usersTable = document.getElementById("users-table");
  usersTable.innerHTML = "";

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

// ✅ Delete User
window.deleteUser = function(userId) {
  const userRef = ref(database, `users/${userId}`);
  remove(userRef)
    .then(() => {
      fetchUsers();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// ✅ Add User
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (name && email && role) {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);

    set(newUserRef, {
      name: name,
      email: email,
      role: role
    }).then(() => {
      addUserForm.reset();
      fetchUsers();
    }).catch((error) => {
      console.error("Error adding user:", error);
    });
  }
});

// ✅ Create Course (dummy simulation)
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();

  if (title && description && videoUrl) {
    alert(`Course "${title}" created successfully!`);
    createCourseForm.reset();
    // Here you can add Firestore or Realtime Database logic to save courses
  }
});
