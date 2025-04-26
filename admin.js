// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
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

// Load Users
async function loadUsers() {
  const tableBody = document.querySelector("#users-section tbody");
  tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    tableBody.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const user = docSnap.data();
      const userId = docSnap.id;

      const row = `
        <tr>
          <td>${user.name || '-'}</td>
          <td>${user.email}</td>
          <td>${user.role || 'Employee'}</td>
          <td>
            <button class="action-btn" onclick="editUser('${userId}')">Edit</button>
            <button class="action-btn danger" onclick="deleteUser('${userId}')">Delete</button>
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

// Add User
const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role = document.getElementById('new-role').value;

  if (!name || !email || !role) {
    alert("All fields are required!");
    return;
  }

  try {
    await addDoc(collection(db, "users"), { name, email, role });
    alert("User added successfully!");
    addUserForm.reset();
    loadUsers(); // Refresh user list
  } catch (error) {
    console.error("Error adding user:", error);
    alert("Failed to add user. Check console for details.");
  }
});

// Delete User
window.deleteUser = async (userId) => {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "users", userId));
    alert("User deleted successfully!");
    loadUsers(); // Refresh list
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user. Check console for details.");
  }
};

// Placeholder for future edit functionality
window.editUser = (userId) => {
  alert(`Edit feature coming soon for user ID: ${userId}`);
};

// Initial Load
loadUsers();
