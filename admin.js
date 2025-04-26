// ✅ Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// ✅ Firebase Config
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
const db = getDatabase(app);

// ✅ Logout Button
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// ✅ Check Admin Authentication
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Not logged in
  } else {
    console.log("Admin logged in:", user.email);
    fetchUsers(); // Fetch users from database
  }
});

// ✅ Users Table Reference
const usersTable = document.getElementById('users-table');

// ✅ Fetch Users from Realtime Database
function fetchUsers() {
  const usersRef = ref(db, 'users/');
  get(usersRef).then(snapshot => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      usersTable.innerHTML = ""; // Clear
      for (const id in users) {
        const user = users[id];
        const row = `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><button class="delete-btn" onclick="deleteUser('${id}')">Delete</button></td>
          </tr>
        `;
        usersTable.insertAdjacentHTML('beforeend', row);
      }
    } else {
      usersTable.innerHTML = "<tr><td colspan='4'>No Users Found</td></tr>";
    }
  }).catch(console.error);
}

// ✅ Add New User
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (name && email && role) {
    const usersRef = ref(db, 'users/');
    const newUserRef = push(usersRef);
    set(newUserRef, { name, email, role })
      .then(() => {
        alert('User Added Successfully');
        addUserForm.reset();
        fetchUsers();
      })
      .catch(console.error);
  }
});

// ✅ Delete User
window.deleteUser = function (id) {
  const userRef = ref(db, `users/${id}`);
  remove(userRef)
    .then(() => {
      alert('User Deleted Successfully');
      fetchUsers();
    })
    .catch(console.error);
}

// ✅ Create New Course
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();

  if (title && description && videoUrl) {
    const coursesRef = ref(db, 'courses/');
    const newCourseRef = push(coursesRef);
    set(newCourseRef, { title, description, videoUrl })
      .then(() => {
        alert('Course Created Successfully');
        createCourseForm.reset();
      })
      .catch(console.error);
  }
}
