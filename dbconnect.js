const mongoose = require('mongoose');

module.exports = async function connectDB() {
    try {
        const mongoURI = process.env.mongoURI;

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB successfully!");

    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    }
};
