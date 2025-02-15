let currentLesson = null;
let completedQuizzes = {};

const videoLinks = {
    "lesson1": "https://www.youtube.com/embed/YOUR_VIDEO_ID1",
    "lesson2": "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
    "lesson3": "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
    "lesson4": "https://www.youtube.com/embed/YOUR_VIDEO_ID4"
};

function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function showVideo(title, lessonId) {
    if (!completedQuizzes[lessonId]) {
        document.getElementById("videoTitle").innerText = title;
        document.getElementById("videoFrame").src = videoLinks[lessonId] || "";
        document.getElementById("videoContainer").style.display = "block";
        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none"; // Hide dropdown
        currentLesson = lessonId;
    } else {
        alert("You must complete the quiz before moving on.");
    }
}

function showQuiz() {
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
}

function submitQuiz() {
    alert("Quiz completed! You can now access the next video.");
    completedQuizzes[currentLesson] = true;
    document.getElementById("quizContainer").style.display = "none";
}

function logout() {
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
}
