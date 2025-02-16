// Ensure collapsible sections work
document.addEventListener("DOMContentLoaded", function () {
    const collapsibles = document.querySelectorAll(".collapsible");

    collapsibles.forEach(button => {
        button.addEventListener("click", function () {
            // Toggle active class for styling
            this.classList.toggle("active");

            // Get the next sibling element (content div)
            let content = this.nextElementSibling;

            // Toggle visibility properly
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

// Login Function
function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!employeeId || !password) {
        alert("⚠️ Please enter Employee ID and Password.");
        return;
    }

    const validEmployees = {
        "E001": "password1",
        "E002": "password2",
        "E003": "password3"
    };

    if (validEmployees[employeeId] && validEmployees[employeeId] === password) {
        localStorage.setItem("loggedInUser", employeeId);
        alert("✅ Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Employee ID or Password.");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Redirect logged-in users from index.html to dashboard.html
if (window.location.pathname.includes("index.html") && localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
}
