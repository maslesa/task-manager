# ✅ Task Manager Application  
Task Manager is a full-stack MERN application that helps users stay organized by allowing them to manage daily tasks with ease. Users can create an account, update their profile, and add tasks based on priority or status (e.g. today’s tasks, completed, important, etc.).  
The app includes support for light and dark mode for a more personalized user experience.

---

## 🚧 Status  
**Project Completed** – All core features are fully functional and styled.

---

## ✨ Features

- 📝 **User Authentication**  
  Register and securely log in to manage your tasks.

- 👤 **Profile Management**  
  Change your account details including name and password.

- ➕ **Task Creation**  
  Add new tasks categorized as:
  - Today
  - Important
  - Completed
  - Uncompleted

- 🔄 **Task Tracking**  
  Easily update the status of your tasks.

- 🗑️ **Task Deletion**  
  Remove tasks that are no longer needed.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- TailwindCSS

### Backend
- Node.js  
- Express.js

### Database
- MongoDB

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB installed or a cloud MongoDB URI

### Installation

```bash
# Clone the repository
git clone https://github.com/maslesa/task-manager.git
cd task-manager

# Install backend dependencies
cd server
npm install

# Start the backend server
npm run dev

# Open a new terminal tab for frontend
cd ../client/task-manager
npm install

# Start the frontend development server
npm run dev
