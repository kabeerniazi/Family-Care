document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginBtn = document.getElementById("nav-login"); // Ensure these IDs match your HTML
    const signupBtn = document.getElementById("nav-signup");
    const logoutBtn = document.getElementById("nav-logout");

    // --- Part A: Logic for UI (Show/Hide Buttons) ---
    if (isLoggedIn === "true") {
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (signupBtn) signupBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    // --- Part B: Logic for Protected Pages ---
    const protectedPages = ["testimonial.html", "contact.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage) && isLoggedIn !== "true") {
        alert("Access Denied! Please login to your Family Care account first.");
        window.location.href = "/login.html";
    }

    // --- Part C: Logout Functionality ---
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            alert("You have been logged out.");
            window.location.href = "/index.html";
        });
    }
});
