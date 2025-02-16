// ✅ Redirect user to dashboard if already logged in
function redirectIfLoggedIn() {
    if (localStorage.getItem("loggedInUser")) {
        window.location.href = "dashboard.html";
    }
}

// ✅ Prevent direct access to dashboard
function checkLogin() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "index.html";
    }
}

// ✅ Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// ✅ Secure Login Function
function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Simulated hashed passwords (use backend in real-world)
    const validEmployees = {
        "E001": "5f4dcc3b5aa765d61d8327deb882cf99", // MD5 hash of "password1"
        "E002": "e99a18c428cb38d5f260853678922e03", // MD5 hash of "password2"
        "E003": "098f6bcd4621d373cade4e832627b4f6"  // MD5 hash of "test"
    };

    if (validEmployees[employeeId] && md5(password) === validEmployees[employeeId]) {
        localStorage.setItem("loggedInUser", employeeId);
        window.location.href = "dashboard.html";
    } else {
        errorMessage.innerText = "❌ Invalid Employee ID or Password.";
    }
}

// ✅ Simple MD5 Hashing (Replace with real backend security)
function md5(string) {
    return CryptoJS.MD5(string).toString();
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
