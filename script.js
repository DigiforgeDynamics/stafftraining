// ✅ Redirect user if not logged in
function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "index.html";  // Redirect to login
    }
}

// ✅ Secure Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// ✅ Secure Login Function (Example)
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Simulated hashed passwords (Replace with actual hashing in backend)
    let users = {
        "admin": "5f4dcc3b5aa765d61d8327deb882cf99"  // MD5 of "password"
    };

    if (users[username] && md5(password) === users[username]) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials");
    }
}

// ✅ Simple MD5 Hashing (Use real backend hashing)
function md5(string) {
    return CryptoJS.MD5(string).toString();
}


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
