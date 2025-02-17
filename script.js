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

    // Simulated hashed passwords and employeeId (use backend in real-world)
    const validEmployees = {
        "e99a18c428cb38d5f260853678922e03": "5f4dcc3b5aa765d61d8327deb882cf99", 
        "0cc175b9c0f1b6a831c399e269772661": "e99a18c428cb38d5f260853678922e03",
        "098f6bcd4621d373cade4e832627b4f6": "098f6bcd4621d373cade4e832627b4f6" 
    };

    // Hash employeeId and password
    const hashedEmployeeId = md5(employeeId);
    const hashedPassword = md5(password);

    // Check if the hashed employeeId exists and if the password matches
    if (validEmployees[hashedEmployeeId] && validEmployees[hashedEmployeeId] === hashedPassword) {
        localStorage.setItem("loggedInUser", hashedEmployeeId);
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
