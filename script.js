// 🚀 Redirect logged-in users from index.html to dashboard.html
if (window.location.pathname.includes("index.html") && localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
}

// ✅ Login Function
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
        window.location.href = "dashboard.html"; // Smooth redirect
    } else {
        errorMsg.textContent = "❌ Invalid Employee ID or Password.";
    }
}

// 🚪 Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// 📌 Collapsible Course Sections
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });
});

// 👤 User Profile Dropdown
function toggleDropdown() {
    document.getElementById("userDropdown").classList.toggle("show");
}

// 📝 Update User Name on Dashboard
function updateUserName() {
    let userId = localStorage.getItem("loggedInUser");
    const userNames = {
        "E001": "John Doe",
        "E002": "Jane Smith",
        "E003": "Alice Johnson"
    };
    document.getElementById("user-name").textContent = "Logged in as: " + (userNames[userId] || "Employee");
}

// 📺 Redirect User to Video Page on Click
function goToVideo(lessonId) {
    window.location.href = `video.html?lesson=${lessonId}`;
}

// 📌 Handle Video Display
const params = new URLSearchParams(window.location.search);
const lessonId = params.get("lesson");

const videoLinks = {
    "intro": "https://www.youtube.com/embed/YOUR_VIDEO_ID1",
    "prompting": "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
    "editor": "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
    "security": "https://www.youtube.com/embed/YOUR_VIDEO_ID4",
    "ai": "https://www.youtube.com/embed/YOUR_VIDEO_ID5",
    "project": "https://www.youtube.com/embed/YOUR_VIDEO_ID6",
    "testing": "https://www.youtube.com/embed/YOUR_VIDEO_ID7"
};

if (lessonId && document.getElementById("videoFrame")) {
    document.getElementById("videoTitle").innerText = lessonId.replace("-", " ");
    document.getElementById("videoFrame").src = videoLinks[lessonId] || "";
}

// 📝 Quiz Handling - Show Quiz After Video
const quizContainer = document.getElementById("quizContainer");
setTimeout(() => {
    if (quizContainer) quizContainer.style.display = "block";
}, 5000); // Show quiz after 5 sec

// ✅ Ensure Quiz is Mandatory Before Next Video
function submitQuiz() {
    let answer = document.querySelector('input[name="quiz"]:checked');
    if (answer && answer.value === "correct") {
        alert("✅ Correct! You may proceed.");
        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("courseContainer").style.display = "block"; // Show course list again
    } else {
        alert("❌ Incorrect. Try again.");
    }
}

// 📌 Hide Course Dropdown When Video Appears
function showVideo(title, lessonId) {
    document.getElementById("videoTitle").innerText = title;
    document.getElementById("videoFrame").src = videoLinks[lessonId] || "";
    document.getElementById("videoContainer").style.display = "block";
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("courseContainer").style.display = "none"; // Hide course list
}

// 🔄 Initialize User Info on Dashboard
window.onload = updateUserName;
