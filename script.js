// Redirect logged-in users from index.html to dashboard.html
if (window.location.pathname.includes("index.html") && localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
}

// Login Function
function login() {
    const employeeId = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.createElement("p"); // Error message element

    // Remove previous error messages
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    if (!employeeId || !password) {
        errorMsg.textContent = "⚠️ Please enter Employee ID and Password.";
        errorMsg.classList.add("error-msg");
        document.querySelector(".login-container").appendChild(errorMsg);
        return;
    }

    // Simulated authentication (Replace with a real API in the future)
    const validEmployees = {
        "E001": btoa("password1"), // Encrypted passwords
        "E002": btoa("password2"),
        "E003": btoa("password3")
    };

    if (validEmployees[employeeId] && validEmployees[employeeId] === btoa(password)) {
        localStorage.setItem("loggedInUser", employeeId);
        window.location.href = "dashboard.html"; // Redirect
    } else {
        errorMsg.textContent = "❌ Invalid Employee ID or Password.";
        errorMsg.classList.add("error-msg");
        document.querySelector(".login-container").appendChild(errorMsg);
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Handle Collapsible Course Sections
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // Update User Info on Dashboard
    updateUserName();
});

// Update User's Name in the Dashboard
function updateUserName() {
    let userId = localStorage.getItem("loggedInUser");
    const userNames = {
        "E001": "John Doe",
        "E002": "Jane Smith",
        "E003": "Alice Johnson"
    };
    let userElement = document.createElement("div");
    userElement.className = "user-info";
    userElement.innerHTML = `<span>👤 ${userNames[userId] || "Employee"}</span>`;

    document.querySelector("header").appendChild(userElement);
}

// Load Video in Video Page
function loadVideo() {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get("lesson");

    const videoLinks = {
            "intro": "https://www.youtube.com/watch?v=w0nyEoXBEiA&list=RDw0nyEoXBEiA&start_radio=1",
        "overview": "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
        "what-is-prompting": "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
        "types-of-prompts": "https://www.youtube.com/embed/YOUR_VIDEO_ID4",
        "install-vscode": "https://www.youtube.com/embed/YOUR_VIDEO_ID5",
        "editor-shortcuts": "https://www.youtube.com/embed/YOUR_VIDEO_ID6"
    };

    if (lessonId && document.getElementById("trainingVideo")) {
        document.getElementById("trainingVideo").src = videoLinks[lessonId] || "";
    }
}

// Ensure Video Loads on video.html
if (window.location.pathname.includes("video.html")) {
    window.onload = loadVideo;
}

// Wait until the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Ensure collapsible sections work
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;

            // Toggle visibility with a smooth effect
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // Update User Info on Dashboard
    updateUserName();
});

// Update User's Name in the Dashboard
function updateUserName() {
    let userId = localStorage.getItem("loggedInUser");
    const userNames = {
        "E001": "John Doe",
        "E002": "Jane Smith",
        "E003": "Alice Johnson"
    };
    let userElement = document.createElement("div");
    userElement.className = "user-info";
    userElement.innerHTML = `<span>👤 ${userNames[userId] || "Employee"}</span>`;

    document.querySelector("header").appendChild(userElement);
}

