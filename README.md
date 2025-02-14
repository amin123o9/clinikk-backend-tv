# clinikk-backend-tv
Features
The backend provides several key functionalities:

User authentication with session-based login
Subscription management for premium content access
Media content delivery with premium content restrictions
Viewing history tracking and progress management
Content categorization and filtering

Technology Stack

Node.js and Express.js for the server
MongoDB for the database
Mongoose as the ODM (Object Document Mapper)
Express-session for session management
BCrypt for password hashing

Prerequisites
Before running this application, ensure you have:

Node.js (v14 or higher)
MongoDB installed and running
npm or yarn package manager

Installation

Clone the repository:

git clone <repository-url>
cd clinikk-tv-backend

Install dependencies:



Start the server:

npm start


API Endpoints
Authentication

POST /auth/signup - Register a new user
jsonCopy{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phoneNumber": "1234567890"
}

POST /auth/login - Login user
jsonCopy{
  "email": "john@example.com",
  "password": "securepassword"
}

POST /auth/logout - Logout user
Categories

GET /categories - Get all categories
Subscriptions

POST /subscriptions - Create new subscription
jsonCopy{
  "planType": "premium",
  "startDate": "2025-02-14",
  "endDate": "2026-02-14"
}

GET /subscriptions/status - Check subscription status
