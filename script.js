function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // Clear previous error message
    errorMsg.textContent = "";

    if (!employeeId || !password) {
        errorMsg.textContent = "⚠️ Please enter Employee ID and Password.";
        return;
    }

    const validEmployees = {
        "E001": "password1",
        "E002": "password2",
        "E003": "password3"
    };

    if (validEmployees[employeeId] && validEmployees[employeeId] === password) {
        localStorage.setItem("loggedInUser", employeeId);
        window.location.href = "dashboard.html"; // Smooth redirect without alert
    } else {
        errorMsg.textContent = "❌ Invalid Employee ID or Password.";
    }
}
