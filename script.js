const users = {
    "E001": "password1",
    "E002": "password2",
    "E003": "password3"
};

// Redirect if already logged in
if (localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
}

function login() {
    const employeeId = document.getElementById("employeeId").value;
    const password = document.getElementById("password").value;

    if (users[employeeId] && users[employeeId] === password) {
        localStorage.setItem("loggedInUser", employeeId); // Store session
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid Employee ID or Password.");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to login page
}
