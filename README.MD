# Task Management System (Backend Focused)

A scalable **REST API** with authentication, role-based access control, task management, and a minimal frontend UI for API interaction.

This project is built as part of a **Backend Developer (Intern) Assignment**, with a primary focus on **backend architecture, security, and scalability**.

---

## 📌 Project Overview

The application allows users to:

* Register and log in securely
* Create, view, update, and delete tasks
* Access APIs based on roles (**USER / ADMIN**)

### Admin Capabilities

Admins can:

* View all users
* View all tasks
* View tasks of a specific user
* Change user roles
* Delete users

A **minimal React frontend** is included only to demonstrate and test backend APIs.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Redis (Caching & Rate Limiting)
* Swagger (OpenAPI)
* Winston & Morgan (Logging)

### Frontend (Basic)

* React.js
* Axios

---

### 🛡️ Security & Scalability

* API versioning (`/api/v1`)
* Centralized error handling
* Input validation
* Redis-based rate limiting
* Redis-based caching for GET APIs
* Secure JWT handling
* env.js to handle missing varaibles 

---

### 📚 API Documentation

* Swagger UI for all APIs
* Clear request/response schemas
* JWT security configuration

---

### 📝 Logging

* **Winston** for application logs
* **Morgan** for HTTP request logging
* Logs stored in `/logs` directory

---

## 🗂️ Project Structure

```
backend/
├── logs/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── redis.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── redisRateLimiter.middleware.js
│   │   ├── cache.middleware.js
│   │   └── error.middleware.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── admin/
│   ├── utils/
│   │   ├── jwt.js
│   │   └── logger.js
│   ├── app.js
│   └── server.js
├── swagger/
│   └── swagger.js
├── .env
└── .gitignore
|
├── package-locak.json
└── package.json

```

---

## 🔗 API Endpoints (Summary)

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Tasks

* `POST /api/v1/tasks`
* `GET /api/v1/tasks`
* `PUT /api/v1/tasks/:id`
* `DELETE /api/v1/tasks/:id`

### Admin

* `GET /api/v1/admin/users`
* `GET /api/v1/admin/tasks`
* `GET /api/v1/admin/users/:id/tasks`
* `DELETE /api/v1/admin/users/:id`
* `PATCH /api/v1/admin/users/:id/role`

---

## 📖 API Documentation

Swagger UI available at:

```
http://localhost:5000/api-docs
```

---

## ⚙️ Setup Instructions

###  Clone Repository

```
git clone https://github.com/mr-bott/task-management-system
cd task-management-system 
cd backend   on terminal 1
cd frontend  on terminal 2
```

###  Install Dependencies

```
npm install  on terminal 1
npm install  on terminal 2

```

###  Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://127.0.0.1:6379
NODE_ENV=development
JWT_EXPIRES_IN=1d
```

###  Run Server

```
npm run dev
```

###  Run Client

```
npm start
```

---


---

## ⚙️ Doceker Setup Instructions Backend ⚙️

###  Clone Repository

```
 cd backend  

```

###  Run Command 

```
docker-compose up --build

```

---

## 🧠 Scalability Notes

* Modular architecture allows easy feature expansion
* Redis enables horizontal scaling
* Rate limiting protects APIs from abuse
* Caching reduces database load

### Can be extended with:

* Docker & Nginx
* Microservices architecture
* Message queues (Kafka / RabbitMQ)
* Cloud deployment (AWS / GCP)

---

## 🎯 Assignment Highlights

* Clean REST API design
* Secure authentication & authorization
* Real-world middleware usage
* Backend-focused implementation
* Minimal but functional frontend
* Production-oriented project structure

---

## 👤 Author

**Murali Krishna**
Backend Developer – Intern Applicant
