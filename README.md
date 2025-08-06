# 🧠 Task Manager API (Next.js + Prisma + PostgreSQL)

A secure and modular task management API built with **Next.js (Pages Router)**, **Prisma**, and **PostgreSQL**. Supports authentication, task categorization, filtering, and JWT-based protection.

---

## 🚀 Features

- 🔐 User Registration & Login with hashed passwords (bcrypt)
- ✅ JWT Authentication with protected routes
- 📝 CRUD Operations for Tasks
- 🗂️ Categories to organize tasks (e.g., Work, Personal)
- 🔍 Filtering by category or status (e.g., `GET /api/tasks?status=done`)
- 📦 Modular structure using `/lib`, `/utils`, and middlewares
- ☁️ Deployed on Vercel: [Live API Link](https://backend-beta-lake-21.vercel.app/)

---

## 🧪 How to Use (Test with Thunder Client)

### 🔐 Auth
- `POST /api/auth/register` – Create new user
- `POST /api/auth/login` – Login user, receive JWT

### 📋 Tasks
- `GET /api/tasks` – Get all tasks (JWT required)
- `POST /api/tasks` – Add new task
- `PUT /api/tasks/[id]` – Update task
- `DELETE /api/tasks/[id]` – Delete task

### 🗂️ Categories
- `GET /api/categories` – Get all categories
- `POST /api/categories` – Create new category

---

## 🔧 Technologies Used
- Next.js (API routes)
- Prisma ORM
- PostgreSQL
- Bcrypt & JWT
- Thunder Client (for testing)

---

## 👩‍💻 Run Locally

```bash
git clone https://github.com/Tia-d21/backend.git
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


📌 Notes
This project uses Pages Router, not App Router.

Auth is handled via custom JWT middleware, not NextAuth.

📣 Contributing
Feel free to fork, clone, or suggest improvements.

👩‍💻 Created by Tiya

