const express = require('express');
const session = require('express-session');
const connectDB = require('./dbconnect');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Auth middleware
const checkAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Please login first' });
    }
    next();
};

// Import routes
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const historyRoutes = require('./routes/historyRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


// Routes
app.use('/auth', authRoutes);

// Protected routes (assumes authentication is handled within each route module)
app.use('/sub', subscriptionRoutes);
app.use('/media', mediaRoutes);
app.use('/history', historyRoutes);
app.use('/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
})();