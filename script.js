// ✅ Stored Hashed Credentials (SHA-256 hashed with salt)
const users = {
    "6bce2aed22e92ac80d61b8c3ef7dc58c": "9ef79e29225b504e0c14f5b3f3479b2d3cb07aa42e2036ae0cdbdcb42956352e"
};

// ✅ Security Settings
const SALT = "DFD_SECURE_SALT";
const LOCKOUT_TIME = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

// ✅ Hash function (SHA-256 with Salt)
function hash(text) {
    return CryptoJS.SHA256(text + SALT).toString();
}

// ✅ Encrypt Employee ID (MD5 for quick lookup)
function encryptID(id) {
    return CryptoJS.MD5(id).toString();
}

// ✅ AES Encryption for Session Tokens
function encryptSession(data) {
    return CryptoJS.AES.encrypt(data, SALT).toString();
}

// ✅ AES Decryption for Session Tokens
function decryptSession(ciphertext) {
    try {
        return CryptoJS.AES.decrypt(ciphertext, SALT).toString(CryptoJS.enc.Utf8);
    } catch {
        return null;
    }
}

// ✅ Brute-force Protection
let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;

function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Check Lockout
    const lockout = localStorage.getItem("lockoutTime");
    if (lockout && Date.now() - parseInt(lockout) < LOCKOUT_TIME) {
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
        const sessionToken = encryptSession(encryptedId);
        sessionStorage.setItem("authToken", sessionToken);
        localStorage.removeItem("loginAttempts"); // Reset attempts
        localStorage.removeItem("lockoutTime");  // Remove lockout
        window.location.href = "dashboard.html";
    } else {
        attempts++;
        localStorage.setItem("loginAttempts", attempts);
        errorMessage.innerText = `❌ Invalid credentials. (Attempts left: ${MAX_ATTEMPTS - attempts})`;

        if (attempts >= MAX_ATTEMPTS) {
            localStorage.setItem("lockoutTime", Date.now()); // Set lockout timestamp
            errorMessage.innerText = "🚫 Too many failed attempts. Try again after 10 minutes.";
        }
    }
}

// ✅ Redirect if Already Logged In
function redirectIfLoggedIn() {
    const token = sessionStorage.getItem("authToken");
    if (token && decryptSession(token)) {
        window.location.href = "dashboard.html";
    }
}

// ✅ Prevent Direct Access to Dashboard
function checkLogin() {
    const token = sessionStorage.getItem("authToken");
    if (!token || !decryptSession(token)) {
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
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lockoutTime");
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
