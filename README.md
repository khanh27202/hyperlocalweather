# ❄️ ENGS 90: SubZero Systems

## 📌 Overview  
This project consists of a **frontend** (React) and a **backend** (Flask) running in Docker containers. You can run both services together using Docker Compose or start only the frontend for development.

🌍 **Live Demo:** [Dartmouth Snow Removal System](https://www.dartmouth-team1snowremoval.com/)  
![Project Demo](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDNrbTdma3NhNTZtaDQ0eTZ1cDExeDRjNmJwNmswejA2MXNoazhxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sEEt0iPa89YE0hzjFl/giphy.gif)

---

## 🛠 Prerequisites  
Ensure you have the following installed:  

- **[Docker & Docker Compose](https://docs.docker.com/get-docker/)**
- **[Node.js & npm](https://nodejs.org/)** (Only if running the frontend outside Docker)

---

## 🔥 Running the Full Project (Frontend + Backend)

To build and start both containers:
```sh
docker-compose up --build
```

This will:

- Start the **frontend** on [http://localhost:3000](http://localhost:3000)
- Start the **backend** on [http://127.0.0.1:5002](http://127.0.0.1:5002/)
To stop the containers:

```sh
docker-compose down
```
---
## 🎯 Running Only the Frontend (Without Docker)
For faster development, you can run the frontend locally:

```sh
cd frontend
npm install
npm start
```

This starts the frontend on [http://localhost:3000](http://localhost:3000)and will automatically reload when you make changes.

---
## 🛠 Running Only the Backend (In Docker)
If you only need to test backend changes:

```sh
docker-compose up --build api
```
or manually:

```sh
cd server
docker build -t my-backend .
docker run -p 5002:5000 my-backend
```
This starts the backend on [http://127.0.0.1:5002](http://127.0.0.1:5002/)

---
## 🔄 Rebuilding the Project
If you make changes and need to rebuild:
```
docker-compose build
docker-compose up
```
---
## 🛑 Stopping Everything
To stop and remove all running containers:

```sh
docker-compose down
```


