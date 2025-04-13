# To-Do List Frontend (Angular)

This is the **frontend** of the To-Do List application built using **Angular**. It interacts with the backend Node.js API to allow users to register, log in, and manage their personal tasks.

---

## Features

- User authentication (Register / Login)
- Manage tasks (Create, View, Update, Mark as Done, Delete)
- Modal-based task editor for better UX
- Responsive UI with clean design
- Auth interceptor for JWT token handling
- Logout functionality

---

## Components

- **Login** – Sign in with an existing account
- **Register** – Create a new user account
- **Task** – Full CRUD UI for managing to-do tasks

---

## Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
ng serve
```

The app will be available at: `http://localhost:4200`

Make sure the backend is running at `http://localhost:3000` and CORS is allowed.

---

## 🐳 Docker Support

If you're running with Docker, the frontend will be served via NGINX on port `4200` (or whichever port you specify in your `docker-compose.yml`).

To run the full app (frontend + backend + PostgreSQL):

```bash
cd ..
docker-compose up --build
```

---

## Author

Created by **Adrien Monthe**

---
