# Task Management System

A full-stack Task Management System built using **React.js** and **Django REST Framework**.
The application allows users to create, view, update, delete, and filter tasks based on their status.

## 🚀 Features

* Create a new task
* View all tasks
* Update existing tasks
* Delete tasks
* Filter tasks by status

  * All
  * Pending
  * In Progress
  * Completed
* Set task priority
* Set due date
* Simple and responsive user interface

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite

### API

* REST API

## 📁 Project Structure

```text
Task-Management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── backend/
    ├── manage.py
    ├── tasks/
    ├── backend/
    └── ...
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/SKM2227229725/Tranzita-technical-assessement-.git
cd Tranzita-technical-assessement-
```

### 2. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

For Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

Backend will run on:

```text
http://127.0.0.1:8000/
```

### 3. Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run on the URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## 🔄 How It Works

```text
React Frontend
      ↓
REST API
      ↓
Django REST Framework
      ↓
Database
```

The React frontend sends HTTP requests to the Django REST API. Django processes the request and performs the required database operation. The response is then displayed in the React application.

## 📌 Task Fields

Each task can contain:

* Title
* Description
* Priority
* Status
* Due Date

## 👨‍💻 Author

**Shailesh Kumar**

Computer Science Engineering Student
Rajkiya Engineering College, Sonbhadra
