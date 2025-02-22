const users = {
    "6bce2aed22e92ac80d61b8c3ef7dc58c": "89be72ec79bda481aabbf13aad37da7aeb3b8bc00137b15d2807769dc0600ac6"
};


function hash(text) {
    return CryptoJS.SHA256(text).toString();
}

function encryptID(id) {
    return CryptoJS.MD5(id).toString();
}


const lockoutTime = 10 * 60 * 1000; // 10 minutes lockout
let attempts = parseInt(sessionStorage.getItem("loginAttempts")) || 0;

function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // ✅ Check if locked out
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
        // ✅ Prevent session hijacking
        sessionStorage.setItem("authToken", encryptedId);
        sessionStorage.setItem("sessionKey", generateSessionKey()); // Secure session
        sessionStorage.setItem("sessionTime", Date.now()); // Store login time
        sessionStorage.removeItem("loginAttempts");
        sessionStorage.removeItem("lockoutTime");
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

function checkSessionTimeout() {
    const loginTime = sessionStorage.getItem("sessionTime");
    if (loginTime && Date.now() - parseInt(loginTime) > 30 * 60 * 1000) {
        logout(); // Auto logout after 15 minutes
    }
}

// ✅ Prevent session hijacking
function verifySession() {
    const storedSessionKey = sessionStorage.getItem("sessionKey");
    if (!storedSessionKey || storedSessionKey !== localStorage.getItem("deviceSessionKey")) {
        logout();
    }
}


function generateSessionKey() {
    const key = CryptoJS.SHA256(Math.random().toString()).toString();
    localStorage.setItem("deviceSessionKey", key);
    return key;
}

// ✅ Redirect if Already Logged In
function redirectIfLoggedIn() {
    checkSessionTimeout();
    verifySession();
    if (sessionStorage.getItem("authToken")) {
        window.location.href = "dashboard.html";
    }
}

function checkLogin() {
    checkSessionTimeout();
    verifySession();
    if (!sessionStorage.getItem("authToken")) {
        window.location.href = "index.html";
    }
}
function logout() {
    sessionStorage.removeItem("authToken"); // Remove authentication token
    window.location.href = "index.html"; // Redirect to login page
}





setInterval(checkSessionTimeout, 60 * 1000);
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
