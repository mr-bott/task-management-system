## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Redis (Caching & Rate Limiting)
* Swagger (OpenAPI) // API Documentation 
* Winston & Morgan (Logs)
---
## 📖 API Documentation

Swagger UI available at:

```
http://localhost:5000/api-docs
```

---

## ⚙️ Setup Instructions Backend

###  Clone Repository

```
git clone https://github.com/mr-bott/task-management-system
cd task-management-system 
then cd backend   
```

###  Install Dependencies

```
npm install 

```

###  Environment Variables (`.env`)

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://127.0.0.1:6379
JWT_EXPIRES_IN=1d
```

---

## ⚙️ Docker Setup Instructions Backend ⚙️

###  Clone Repository

```
 cd backend  

```

###  Run Command 

```
docker-compose up --build

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