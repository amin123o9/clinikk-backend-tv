// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');

class AuthController {
    // Signup
    async signup(req, res) {
        try {
            const { name, email, password, phoneNumber } = req.body;

            // Check if user exists
            const existingUser = await User.findOne({ 
                $or: [{ email }, { phoneNumber }] 
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = new User({
                name,
                email,
                password: hashedPassword,
                phoneNumber
            });

            await user.save();

            // Store user ID in session
            req.session.userId = user._id;

            res.status(201).json({
                message: 'Signup successful',
                userId: user._id
            });

        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ message: 'Error during signup' });
        }
    }

    // Login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // Store user ID in session
            req.session.userId = user._id;

            res.json({
                message: 'Login successful',
                userId: user._id
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Error during login' });
        }
    }

    // Middleware to check if user is logged in
    async checkAuth(req, res, next) {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Please login first' });
        }
        next();
    }

    // Logout
    async logout(req, res) {
        req.session.destroy();
        res.json({ message: 'Logged out successfully' });
    }
}

module.exports = new AuthController();