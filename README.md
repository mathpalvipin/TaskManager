# Web Application
Link : https://task-manager-frontend-jade.vercel.app/

Welcome to our web application! This project is built using a modern stack of technologies to provide a robust and user-friendly experience for task management and notifications.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [How to Use](#how-to-use)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Context**: Used for authentication context throughout the web app.
- **React-Redux**: To manage and centralize task management state.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Node-Scheduler**: To schedule task.(The scheduling script that continuously monitors and schedules tasks should be deployed on an environment that supports long-running processes. Vercel itself does not support long-running processes, so you'll need to use localhost instead for notification)

- **Cron Job**: For periodic task scheduling.
- **JWT (JSON Web Token)**: Used for secure authentication, with tokens stored in HTTP-only cookies.
- **MongoDB**: A NoSQL database for storing application data.

### Notifications

- **WebPush**: To send notifications.
- **Service Worker**: To listen to push events and show notifications on the frontend.

## Features

### Task Management

- Create, edit, and delete tasks.
- Set tasks to be recursive (daily, monthly, yearly, for birthdays).
- Share tasks with other users.
- Get notifications at task time.

## How to Use

1. **Log in** to your account to start managing your tasks.
2. **Create new tasks**, set their recurrence, and share them with your friends and colleagues.
3. **Receive notifications** when tasks are due.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation
# React and Node.js Application Setup

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB (if your backend requires it)

Running the Application

1. Clone the Repository
```
git clone https://github.com/mathpalvipin/TaskManager.git
cd <TaskManager>
```
2. Install Dependencies
Backend
```
cd backend
npm install
```
Frontend
```
cd frontend
npm install
```
4. Start the Servers
Backend
```
cd backend
npm start
```
Backend server runs on http://localhost:5000.

Frontend
In a new terminal window/tab:

```
cd frontend
npm start
```
Frontend app runs on http://localhost:3000.

Example Environment Files
React .env.example

```
SECRET_KEY=
MONGODB_URI=
FRONTEND_URL=http://localhost:3000
PRIVATE_KEY=
PUBLIC_KEY=
```

Node .env.example
```
REACT_APP_BACKENDURL=http://localhost:5000
```


# TaskManager

#react 
https://create-react-app.dev/docs/getting-started

#npm  React template 
https://www.npmjs.com/search?q=cra-template-*

#Adding typescript in existing project
https://create-react-app.dev/docs/adding-typescript/


##Using React with javascript



##Backend 
``` 
mkdir backend
cd backend
npm init -y
npm install express mongoose bcrypt cors jsonwebtoken body-parser dotenv
```

###frontend 

```npx create-react-app my-app
cd my-app
npm start
```
## refer the youtube video for HTTPonly cookie setup
 https://www.youtube.com/watch?v=a5Krfkfl9MM&ab_channel=RahulAhire  


## send props and function between child and parent
https://stackoverflow.com/questions/37949981/call-child-method-from-parent

## Redux 
https://www.youtube.com/watch?v=1i04-A7kfFI&ab_channel=ChaiaurCode
Redux Toolkit is available as a package on NPM for use with a module bundler or in a Node application:

```
npm install @reduxjs/toolkit
```
If you need React bindings:
```
npm install react-redux
```
The package includes a precompiled ESM build that can be used as a <script type="module"> tag directly in the browser.

## icons 
https://react-icons.github.io/react-icons/

calender : https://www.youtube.com/watch?v=s9-K02CP8hw&ab_channel=DailyWebCoding

tailwind css
https://tailwindcss.com/docs/installation


## React Query 
https://tanstack.com/query/latest/docs/framework/react/guides/queries


UI initial ->
![alt text](image.png)
newUI initial ->
![alt text](image2.png)

