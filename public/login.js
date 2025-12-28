const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (response.ok) {
           localStorage.setItem("isLoggedIn", "true"); 
    localStorage.setItem("userEmail", email.value); 
    
    alert("Welcome back!");
    window.location.href = "/index.html";
        } else {
            alert(result.error || "Login failed");
        }
    } catch (err) {
        alert("Error connecting to server");
    }
});
