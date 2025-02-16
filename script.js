// ========================= LOGIN FUNCTIONALITY =========================
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const employeeID = document.getElementById("employeeID").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("error-message");

            // Hardcoded login details (Replace with secure authentication)
            const validUsers = [
                { id: "user1", pass: "password1" },
                { id: "admin", pass: "admin123" }
            ];

            const userExists = validUsers.some(user => user.id === employeeID && user.pass === password);

            if (userExists) {
                localStorage.setItem("loggedInUser", employeeID);
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                errorMessage.textContent = "Invalid Employee ID or Password!";
            }
        });
    }

    // ========================= DASHBOARD FUNCTIONALITY =========================
    const dashboardPage = document.getElementById("dashboardPage");
    if (dashboardPage) {
        const userDisplay = document.getElementById("userDisplay");
        const logoutBtn = document.getElementById("logoutBtn");

        // Check if user is logged in
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            window.location.href = "index.html"; // Redirect to login if not logged in
        } else {
            userDisplay.textContent = loggedInUser; // Display username
        }

        // Logout functionality
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });

        // ========================= CHAPTER COLLAPSIBLE FUNCTIONALITY =========================
        const chapterButtons = document.querySelectorAll(".chapter-btn");

        chapterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const content = this.nextElementSibling;

                // Toggle chapter visibility
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        });
    }
});
