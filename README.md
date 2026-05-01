# ☕ StudySync — Student Productivity Web App

> A modern productivity dashboard that helps students manage tasks, track focus sessions, and analyze performance using real-time analytics.

---

## 🚀 Live Demo

🔗 https://dhilranv-afk.github.io/StudySync-Student-Productivity-Web-App/
---

## 📸 Preview

![App Demo](assets/demo.gif)

---

## 🎯 Project Overview

**StudySync** is a full-stack productivity application designed for students who want to stay organized and improve their study habits.

It combines **task management**, **focus tracking**, and **data-driven insights** into a single, intuitive interface.

---

## ✨ Key Features

### 📝 Task Management

* Add, complete, and delete tasks
* Persistent storage using Firebase Firestore
* Real-time UI updates

### ⏱️ Focus Timer

* Pomodoro-style countdown timer
* Visual coffee animation ☕ during sessions
* Session tracking for analytics

### 📊 Analytics Dashboard

* Dynamic charts powered by Chart.js
* Weekly productivity tracking
* Task completion vs focus sessions

### 🔥 Productivity Score

* Weighted scoring system:

  * Tasks completed → 70%
  * Study sessions → 30%
* Real-time updates

### 🗓️ Activity Heatmap

* GitHub-style contribution grid
* Visualizes productivity over time

### 🧠 Smart Insights

* Rule-based analytics engine
* Provides feedback like:

  * “Above weekly average”
  * “Low activity detected”
  * “Strong focus sessions today”

### 📤 Data Export

* Export productivity data as CSV
* Enables external analysis

---

## 🏗️ Architecture

### Frontend

* HTML5, CSS3, JavaScript (modular)
* Responsive layout with modern UI design

### Backend

* Firebase Firestore (NoSQL database)
* Cloud-based data persistence

### Data Flow

User Action → Firebase → UI Render → Analytics Engine → Dashboard Visualization

---

## 🧰 Technologies Used

* HTML5 / CSS3 / JavaScript
* Firebase Firestore
* Chart.js
* Git & GitHub
* Firebase Hosting

---

## 📁 Project Structure

```
studysync/
│
├── public/
│   └── index.html
│
├── src/
│   ├── js/
│   │   ├── app.js
│   │   ├── dashboard.js
│   │   └── firebase.js
│   │
│   └── css/
│       └── style.css
│
├── assets/
│   ├── demo.gif
│   └── screenshots/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/your-username/studysync.git
cd studysync
```

### 2. Configure Firebase

* Go to Firebase Console
* Create a project
* Replace config in `firebase.js`

### 3. Run Locally

```
open index.html
```

---

## 🌐 Deployment

Deployed using Firebase Hosting:

```
firebase login
firebase init
firebase deploy
```

---

## 👥 Team & Contributions

| Name            | Role           | Contribution                                    |
| --------------- | -------------- | ----------------------------------------------- |
| Ranveer Dhillon | Full Stack Dev | Core app logic, Firebase integration, analytics |

---

## 🧠 Technical Highlights

* Modular JavaScript architecture
* Real-time database integration (Firestore)
* Data visualization with Chart.js
* Custom analytics engine (score + insights)
* Performance-focused DOM updates
* Scalable project structure

---

## 📚 Lessons Learned

* Importance of clean architecture (frontend vs backend separation)
* Managing async data with Firebase
* Building user-focused analytics features
* Collaborating using GitHub workflows (branches, PRs, reviews)

---

## 🚀 Future Improvements

* User authentication (multi-user support)
* AI-powered productivity recommendations
* Mobile-first optimization
* Backend API (Node.js alternative)
* Notifications & reminders

---

## 📌 Repository

🔗 https://github.com/dhilranv-afk/StudySync-Student-Productivity-Web-App

---

## 🎥 Presentation Video

[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

## 🏆 Final Notes

This project demonstrates:

* Full-stack development skills
* Real-world application design
* Data-driven feature implementation
* Production-ready deployment

---

> Built with focus, caffeine, and consistency ☕
