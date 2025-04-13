// ✅ Wrap everything inside an IIFE to prevent redeclaration
(() => {
    const users = {
        "6bce2aed22e92ac80d61b8c3ef7dc58c": "89be72ec79bda481aabbf13aad37da7aeb3b8bc00137b15d2807769dc0600ac6"
    };

    function hash(text) {
        return CryptoJS.SHA256(text).toString();
    }

    function encryptID(id) {
        return CryptoJS.MD5(id).toString();
    }

    const lockoutTime = 10 * 60 * 1000;
    let attempts = parseInt(sessionStorage.getItem("loginAttempts")) || 0;

    function login() {
        const employeeId = document.getElementById("employeeId").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMessage = document.getElementById("error-message");

        if (!employeeId || !password) {
            errorMessage.innerText = "❌ Employee ID and Password required.";
            return;
        }

        const encryptedId = encryptID(employeeId);
        const hashedPassword = hash(password);

        if (users[encryptedId] && users[encryptedId] === hashedPassword) {
            sessionStorage.setItem("authToken", encryptedId);
            sessionStorage.setItem("sessionKey", generateSessionKey());
            sessionStorage.setItem("sessionTime", Date.now());
            sessionStorage.removeItem("loginAttempts");
            sessionStorage.removeItem("lockoutTime");
            window.location.href = "dashboard.html";
        } else {
            attempts++;
            sessionStorage.setItem("loginAttempts", attempts);
            errorMessage.innerText = `❌ Invalid credentials. Attempts left: ${5 - attempts}`;

            if (attempts >= 5) {
                sessionStorage.setItem("lockoutTime", Date.now());
                errorMessage.innerText = "🚫 Too many failed attempts. Try again later.";
            }
        }
    }

    function generateSessionKey() {
        const key = CryptoJS.SHA256(Math.random().toString()).toString();
        localStorage.setItem("deviceSessionKey", key);
        return key;
    }

    function logout() {
        sessionStorage.clear();
        localStorage.removeItem("deviceSessionKey");
        window.location.href = "index.html";
    }

    window.login = login;
    window.logout = logout;
})();
