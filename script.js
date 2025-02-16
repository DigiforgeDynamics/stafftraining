function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if inputs are empty
    if (!employeeId || !password) {
        alert("⚠️ Please enter Employee ID and Password.");
        return;
    }

    // Simulating server validation (Replace with a real API call in future)
    const validEmployees = {
        "E001": "password1",
        "E002": "password2",
        "E003": "password3"
    };

    if (validEmployees[employeeId] && validEmployees[employeeId] === password) {
        localStorage.setItem("loggedInUser", employeeId); // Store session
        alert("✅ Login successful!");
        window.location.href = "dashboard.html"; // Redirect
    } else {
        alert("❌ Invalid Employee ID or Password.");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to login
}
