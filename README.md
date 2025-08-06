# 🧠 Task Manager API

This is a secure Task Management API built using **Next.js (App Router)**, **Prisma**, and **PostgreSQL**. It allows users to authenticate, manage tasks, and organize them by categories.

---

## 🚀 Tech Stack

- **Next.js 15 (API Routes)**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Thunder Client/Postman for testing**
- **Deployed on Vercel**

---

## 📦 Features

- ✅ User Registration and Login (with JWT)
- ✅ Create, Read, Update, Delete (CRUD) Tasks
- ✅ Filter tasks by status or category
- ✅ Category management (Work, Personal, etc.)
- ✅ Middleware for route protection
- ✅ Input validation using `zod`

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login and get JWT    |

Body (JSON):
```json
{
  "email": "tiya@example.com",
  "password": "1234"
}
//BOdy for POST/PUT
{
  "title": "My Task",
  "description": "Details here",
  "status": "todo",
  "categoryId": "<insert-valid-id>"
}
//Requires Authorization: Bearer <JWT> header.
| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/categories` | Get all categories |
| POST   | `/api/categories` | Create a category  |


Environment Variables
Create a .env file in the root:
DATABASE_URL=postgresql://postgres:<1234>@localhost:5432/taskmanager_db
JWT_SECRET=yourSuperSecretKey123!
NEXTAUTH_SECRET=yourSuperSecretKey123!


Getting Started
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run local dev server
npm run dev


Live API
https://backend-beta-lake-21.vercel.app/

/pages/api
  └── /auth
      ├── login.ts
      └── register.ts
  └── /tasks
      ├── index.ts
      └── [id].ts
  └── /categories
      ├── index.ts
      └── [id].ts

/lib
  ├── prisma.ts
  └── auth.ts
/utils
  └── validators.ts
/middleware
  └── authMiddleware.ts

📌 Notes
This project uses Pages Router, not App Router.

Auth is handled via custom JWT middleware, not NextAuth.

📣 Contributing
Feel free to fork, clone, or suggest improvements.

👩‍💻 Created by Tiya

