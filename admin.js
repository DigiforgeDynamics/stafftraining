
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ3HyXaWZ58fMJxNOt2TpjDf5X0QsEZxo",
  authDomain: "stafftraining-eef33.firebaseapp.com",
@@ -15,125 +14,113 @@ const firebaseConfig = {
  measurementId: "G-3XY8E8XVT2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();

// ✅ Check if Admin is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Not logged in, redirect to login
  } else {
    console.log("Admin logged in:", user.email);
    loadUsers(); // Load users if logged in
  }
});

// ✅ Logout Admin
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html"; // Redirect to login page
});

// ✅ Reference to the users section in database
const usersRef = ref(database, 'users');


// ✅ Fetch Users from Firebase
function loadUsers() {
  const usersTableBody = document.querySelector("#users-section tbody");
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        displayUsers(users);
      } else {
        console.log("No users data found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// ✅ Display Users in Admin Dashboard
function displayUsers(users) {
  const usersTableBody = document.querySelector("#users-section tbody");
  usersTableBody.innerHTML = ''; // Clear table before adding new data

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

// ✅ Delete User from Firebase
function deleteUser(userId) {
  const userRef = ref(database, `users/${userId}`);
  remove(userRef)



    .then(() => {
      alert("User deleted successfully");
      loadUsers(); // Refresh users list after deletion

    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// ✅ Add New User Form
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (name && email && role) {
    const newUser = {
      name: name,
      email: email,
      role: role
    };

    const newUserRef = ref(database, 'users/' + Date.now()); // Create a unique ID based on timestamp
    set(newUserRef, newUser)
      .then(() => {
        alert("New user added successfully");
        addUserForm.reset(); // Reset form
        loadUsers(); // Reload user list
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  } else {
    alert("Please fill out all fields");
  }
});

// ✅ Create Course Form
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', (e) => {
  e.preventDefault();





  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();





  if (title && description && videoUrl) {
    alert(`Course "${title}" created successfully!`);
    createCourseForm.reset(); // Reset form after submission
    // Add Firestore Database Insertion Logic if needed for courses
  } else {
    alert("Please fill out all course fields.");
  }
});
