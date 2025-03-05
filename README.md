# Signup and Login System Documentation

## 1. Introduction

This documentation provides an overview of the signup and login system built using **React, Redux, Node.js, Express, MySQL, and Prisma**. It includes project setup, backend API endpoints, frontend implementation, and authentication flow.

## 2. Tech Stack

- **Frontend:** React, Redux, Redux Toolkit, React Router
- **Backend:** Node.js, Express.js
- **Database:** MySQL, Prisma ORM
- **Authentication:** JWT (JSON Web Tokens), bcrypt

## 3. Project Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/pittu777/signup-login-using-mern.git
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate a secure JWT secret and create a `.env` file with the following variables:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copy the generated key and add it to `.env`:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/dbname"
   JWT_SECRET="paste_generated_secret_here"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## 4. Folder Structure

```
project-root/
│── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│── .env
│── package.json
│── README.md
```

## 5. Backend API Endpoints

### **User Registration**

- **Endpoint:** `POST /api/auth/signup`
- **Request Body:**
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### **User Login**

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "username": "user123",
      "email": "user@example.com"
    }
  }
  ```

## 6. Frontend Implementation

- **Redux for State Management:** Redux Toolkit is used to manage authentication state.
- **React Router:** Protects routes and redirects unauthenticated users.
- **Axios:** Handles API calls to the backend.

## 7. Authentication Flow

1. User signs up → Account gets created in MySQL.
2. User logs in → Backend verifies credentials → Returns JWT token.
3. Token gets stored in **localStorage** or **Redux store**.


## 8. Troubleshooting

**Issue:** Server not starting?

- Check `.env` variables and database connection.
- Run `npx prisma migrate dev` to apply database schema.

## 9. README File

### Project Title: Signup & Login System (MERN + MySQL + Prisma)

This project is a secure authentication system using React, Redux, Node.js, Express, MySQL, and Prisma.

### Features:
- User registration & login
- Secure authentication using JWT & bcrypt
- Database management using Prisma & MySQL
- Fully responsive UI with React & Redux

### Installation:
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure `.env` variables
4. Run `npx prisma migrate dev`
5. Start the app with `npm run dev`



