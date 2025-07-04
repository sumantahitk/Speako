# 🗣️ Speako

**Speako** is a real-time communication platform built to help users improve their speaking skills through live video interactions. It offers secure authentication, a modern user interface, and seamless peer-to-peer video calling functionality.

At its core, Speako uses WebRTC (Web Real-Time Communication) to enable direct, high-quality video calls between users—without the need for external plugins or streaming servers. The frontend is built with React.js and styled using Tailwind CSS, while the backend leverages Node.js, Express, and MongoDB for managing users, sessions, and authentication.

🌐 **Live Demo**: [https://speako-m37o.onrender.com](https://speako-m37o.onrender.com)

---

## Features

- **User Authentication**: Secure sign-up and login with JWT-based auth.
- **Real-Time Chat**: Chat live using Socket.IO integration.
- **Video Calling**: Peer-to-peer video calling with WebRTC.
- **Interactive UI**: Responsive and user-friendly interface.
- **Cross-Device Support**: Optimized for desktop, tablet, and mobile.

---

## Tech Stack

- **Frontend**:
  - React.js  
  - Tailwind CSS  

- **Backend**:
  - Node.js  
  - Express.js  
  - MongoDB (via Mongoose)  

- **Other Tools**:
  - Axios  
  - JSON Web Tokens (JWT)  
  - Socket.IO  
  - WebRTC  
  - [Stream API](https://getstream.io/)

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sumantahitk/Speako.git
   cd Speako

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    STREAM_API_KEY=your_stream_api_key
    STREAM_API_SECRET=your_stream_api_secret
    JWT_SECRET_KEY=your_jwt_secret
    NODE_ENV=production
    ```
4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

## Contact

For any inquiries or feedback, please reach out to [Sumanta](https://github.com/sumantahitk).