// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config object
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
const auth = getAuth(app);
const db = getFirestore(app);

// Check Admin Authentication
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // Not logged in
  } else {
    console.log("Admin logged in:", user.email);
    loadUsers(); // Load user data
    fetchAnalytics(); // Fetch dashboard analytics
  }
});

// Logout function
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// User Role Management
const usersTableBody = document.querySelector("#users-section tbody");

const loadUsers = async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  usersTableBody.innerHTML = ""; // Clear table
  usersSnapshot.forEach((doc) => {
    const user = doc.data();
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <select onchange="updateUserRole('${doc.id}', this.value)">
            <option value="User" ${user.role === 'User' ? 'selected' : ''}>User</option>
            <option value="Admin" ${user.role === 'Admin' ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        <td><button onclick="deleteUser('${doc.id}')" class="delete-btn">Delete</button></td>
      </tr>
    `;
    usersTableBody.insertAdjacentHTML('beforeend', row);
  });
};

// Update User Role
window.updateUserRole = async (userId, newRole) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { role: newRole });
  console.log(`User role updated to ${newRole}`);
};

// Delete User
window.deleteUser = async (userId) => {
  const userRef = doc(db, "users", userId);
  await deleteDoc(userRef);
  loadUsers();
};

// Add New User
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, "password123"); // Default password
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      name: name,
      email: user.email,
      role: role,
    });
    loadUsers();
    addUserForm.reset();
  } catch (error) {
    console.error("Error adding user:", error);
  }
});

// Create Course
const createCourseForm = document.getElementById('create-course-form');
createCourseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-description').value.trim();
  const videoUrl = document.getElementById('course-video-url').value.trim();

  try {
    await addDoc(collection(db, "courses"), {
      title: title,
      description: description,
      videoUrl: videoUrl,
      createdAt: new Date(),
    });
    alert("Course created successfully!");
    createCourseForm.reset();
  } catch (error) {
    console.error("Error creating course:", error);
  }
});

// Dashboard Analytics (Active Users and Course Count)
const fetchAnalytics = async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const coursesSnapshot = await getDocs(collection(db, "courses"));

  document.getElementById('active-users').textContent = usersSnapshot.size;
  document.getElementById('courses-count').textContent = coursesSnapshot.size;
};
