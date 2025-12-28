function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If we are on Testimonial or Contact page and NOT logged in
    const protectedPages = ["testimonial.html", "contact.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage) && isLoggedIn !== "true") {
        alert("Please login first to access this feature!");
        window.location.href = "/login.html";
    }
}

// Run this as soon as the page loads
document.addEventListener("DOMContentLoaded", checkAuth);
