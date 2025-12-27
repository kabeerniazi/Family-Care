document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        fname: document.getElementById("fname").value.trim(),
        lname: document.getElementById("lname").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim()
    };

    if (!data.email || !data.password) {
        alert("Please fill in all fields"); 
        return;
    }

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        
        if (response.ok) {
            alert("Account Created! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            alert(result.error || "Signup failed");
        }
    } catch (err) {
        alert("Error connecting to server");
    }
});