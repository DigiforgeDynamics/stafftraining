const users = {
    "6bce2aed22e92ac80d61b8c3ef7dc58c": "89be72ec79bda481aabbf13aad37da7aeb3b8bc00137b15d2807769dc0600ac6"
};


// ✅ Hash function for SHA-256
function hash(text) {
    return CryptoJS.SHA256(text).toString();
}

// ✅ Encrypt Employee ID (MD5 for quick lookup)
function encryptID(id) {
    return CryptoJS.MD5(id).toString();
}

// ✅ Brute-force protection
const lockoutTime = 10 * 60 * 1000; // 10 minutes in milliseconds
let attempts = parseInt(sessionStorage.getItem("loginAttempts")) || 0;

function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Check if locked out
    const lockout = sessionStorage.getItem("lockoutTime");
    if (lockout && Date.now() - parseInt(lockout) < lockoutTime) {
        errorMessage.innerText = "🚫 Too many failed attempts. Try again later.";
        return;
    }

    if (!employeeId || !password) {
        errorMessage.innerText = "❌ Employee ID and Password required.";
        return;
    }

    const encryptedId = encryptID(employeeId);
    const hashedPassword = hash(password);

    if (users[encryptedId] && users[encryptedId] === hashedPassword) {
        sessionStorage.setItem("authToken", encryptedId);
        sessionStorage.removeItem("loginAttempts"); // Reset attempts
        sessionStorage.removeItem("lockoutTime");  // Remove lockout
        window.location.href = "dashboard.html";
    } else {
        attempts++;
        sessionStorage.setItem("loginAttempts", attempts);
        errorMessage.innerText = `❌ Invalid Employee ID or Password. (Attempts left: ${5 - attempts})`;

        if (attempts >= 5) {
            sessionStorage.setItem("lockoutTime", Date.now()); // Set lockout timestamp
            errorMessage.innerText = "🚫 Too many failed attempts. Try again after 10 minutes.";
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

// ✅ Reset Login Attempts (For Testing)
function resetLoginAttempts() {
    sessionStorage.removeItem("loginAttempts");
    sessionStorage.removeItem("lockoutTime");
    alert("Login attempts have been reset!");
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
