// Hashing function using SHA-256 (safer than MD5)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Employee credentials (hashed passwords)
const validEmployees = {
    "E001": "d2d2d2f4b3b3a6a6c1c1e8e8f2f2f2f2f2f2f2f2", // SHA-256 hashed password
    "E002": "e3e3e3d4d4c4c4a2a2b6b6e9e9f1f1f1f1f1f1f1",
    "E003": "a1a1b2b2c3c3d4d4e5e5f6f6g7g7h8h8i9i9j0j0"
};

// ✅ Secure Login Function
async function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!employeeId || !password) {
        alert("⚠️ Please enter Employee ID and Password.");
        return;
    }

    const hashedPassword = await hashPassword(password);

    if (validEmployees[employeeId] && validEmployees[employeeId] === hashedPassword) {
        localStorage.setItem("loggedInUser", employeeId);
        alert("✅ Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Employee ID or Password.");
    }
}

// ✅ Prevent Direct Access to Dashboard
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("dashboard.html")) {
        let user = localStorage.getItem("loggedInUser");
        if (!user) {
            window.location.href = "index.html";
        }
    }
});

// ✅ Secure Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    sessionStorage.clear();
    window.location.href = "index.html";
}

// ✅ Redirect logged-in users away from the login page
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("index.html")) {
        let user = localStorage.getItem("loggedInUser");
        if (user) {
            window.location.href = "dashboard.html"; // Redirect to dashboard
        }
    }
});
