require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serves your HTML/CSS/JS

// --- MongoDB Connection ---
// Note: We use process.env.MONGODB_URI to match your Vercel settings
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err));

// --- Database Schemas ---
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String // In a real app, you should hash this!
});

const AppointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const TestimonialSchema = new mongoose.Schema({
    message: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

// --- Routes ---

// 1. Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ firstName: fname, lastName: lname, email, password });
        await newUser.save();
        res.json({ success: true, message: "Account created!" });
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
});

// 2. Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

// 3. Contact Form Route
app.post('/api/contact', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.json({ success: true, message: "Appointment booked!" });
    } catch (err) {
        res.status(500).json({ error: "Booking failed" });
    }
});

// 4. Testimonial Route
// 4. Testimonial Route
app.post('/api/testimonial', async (req, res) => {
    try {
        const newTestimonial = new Testimonial({
            // Your form sends 'review', but our schema expects 'message'
            // We can map it here:
            message: req.body.review, 
            author: req.body.name,
            // We can ignore 'id' and 'role' if your Schema doesn't use them, 
            // or update the Schema to include them.
            // Let's stick to the simple Schema for now:
        });
        await newTestimonial.save();
        res.status(200).send("Testimonial saved!");
    } catch (err) {
        res.status(500).json({ error: "Failed to save testimonial" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;