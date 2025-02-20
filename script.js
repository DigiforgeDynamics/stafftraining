// ✅ Secure Login with MD5 Employee ID Hashing & SHA-256 Password Hashing
const users = {
    "e79a7dfd6d5ed9f0e5e06893f168f3bb": "b92601b743a636aa3545105be7388f9738eb771fbb269a6aa888bbf9b8dbb0b4" 
};

// ✅ Hash function for SHA-256 (Passwords)
function hash(text) {
    return CryptoJS.SHA256(text).toString();
}

// ✅ Encrypt Employee ID (MD5 for quick lookup)
function encryptID(id) {
    return CryptoJS.MD5(id).toString();
}

// ✅ Brute-force protection
let attempts = parseInt(sessionStorage.getItem("loginAttempts")) || 0;
const maxAttempts = 5;
const lockoutTime = 10 * 60 * 1000; // 10 minutes in milliseconds

function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (!employeeId || !password) {
        errorMessage.innerText = "❌ Employee ID and Password required.";
        return;
    }

    // Check if user is locked out
    const lockout = sessionStorage.getItem("lockoutTime");
    if (lockout && Date.now() - parseInt(lockout) < lockoutTime) {
        errorMessage.innerText = "🚫 Too many failed attempts. Try again later.";
        return;
    }

    const encryptedId = encryptID(employeeId);
    const hashedPassword = hash(password);

    if (users[encryptedId] && users[encryptedId] === hashedPassword) {
        sessionStorage.setItem("authToken", encryptedId);
        sessionStorage.removeItem("loginAttempts"); // Reset attempts
        sessionStorage.removeItem("lockoutTime"); // Remove lockout if user logs in successfully
        window.location.href = "dashboard.html";
    } else {
        attempts++;
        sessionStorage.setItem("loginAttempts", attempts);
        errorMessage.innerText = `❌ Invalid Employee ID or Password. (Attempts left: ${maxAttempts - attempts})`;

        if (attempts >= maxAttempts) {
            sessionStorage.setItem("lockoutTime", Date.now());
            errorMessage.innerText = "🚫 Too many failed attempts. Try again in 10 minutes.";
            sessionStorage.removeItem("loginAttempts"); // Reset attempts
        }
    }
}

// ✅ Redirect if Already Logged In
function redirectIfLoggedIn() {
    if (sessionStorage.getItem("authToken")) {
        window.location.href = "dashboard.html";
    }
}

// ✅ Prevent Direct Access to Dashboard
function checkLogin() {
    if (!sessionStorage.getItem("authToken")) {
        window.location.href = "index.html";
    }
}

// ✅ Logout Function
function logout() {
    sessionStorage.removeItem("authToken");
    window.location.href = "index.html";
}

// ✅ Collapsible Course Sections
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
});
