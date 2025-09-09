Fullstack Docker App
Project Overview

This project demonstrates how to build, containerize, and run a full-stack web application using Docker and Docker Compose. It includes:

React frontend

Express backend

PostgreSQL database with persistent storage

The goal is to practice Docker-based development workflows and debugging techniques with multi-container applications.

Folder Structure
fullstack-docker-app/
├── backend/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── package.json
│   └── src/
│       └── App.js
├── db-data/                  # Volume mount for PostgreSQL data persistence
├── docker-compose.yml        # Docker Compose file to orchestrate services
├── .env                     # Environment variables (currently empty)
└── README.md                 # Project documentation (this file)

Getting Started
Prerequisites

Docker and Docker Compose installed on your machine

Node.js and npm (for development outside Docker if needed)

Running the Application

Clone the repository

git clone https://github.com/madhu-inaparthi/docker-mini-project.git
cd docker-mini-project


Start all services

docker-compose up --build


Access the frontend

Open your browser and navigate to: http://localhost:3000

You should see the React frontend displaying a message fetched from the backend API.

Backend

Located in /backend

Runs an Express server that connects to PostgreSQL

API endpoint: /api returns current time from the database

Frontend

Located in /frontend

React app that fetches data from the backend API

Database

PostgreSQL runs inside a container with persistent data volume db-data

Configured via environment variables in docker-compose.yml

Useful Docker Commands

Start containers: docker-compose up --build

Stop containers: docker-compose down

View logs: docker-compose logs

List running containers: docker-compose ps

Troubleshooting

If the backend cannot connect to the database, ensure the database container is running and healthy.

If the frontend cannot find index.html, verify the build process is copying all required files correctly.

License

