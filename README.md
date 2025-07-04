# 🗣️ Speako

## 📝 Project Description

**Speako** is a real-time communication platform built to help users enhance their speaking and conversational skills. Designed with both learners and professionals in mind, it combines chat and video features to enable natural, meaningful interactions.

The platform uses **GetStream.io** to provide scalable, real-time chat with features like typing indicators, message history, and user presence. For direct and personal interaction, **WebRTC** powers high-quality video calls between connected users.

One of Speako’s standout features is its **connection system**. When a new user joins, they're shown a list of **suggested users** they can connect with. Users can send **connection requests**, and when another user accepts the request, both become **friends**. Only then can they start chatting or calling each other. This ensures communication is based on mutual consent and safety.

The frontend is built with **React.js** and styled using **Tailwind CSS**, ensuring a modern and responsive design. The backend is powered by **Node.js**, **Express.js**, and **MongoDB**, with **JWT-based authentication** to keep user sessions secure.

Speako is ideal for those looking to practice a new language, improve verbal fluency, or simply connect with others in a real-time, respectful environment.

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
  - MongoDB (Database)  

- **Other Tools**:
  - Axios  
  - JSON Web Tokens (JWT)   
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
     npm run dev
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm run dev
     ```

## Contact

For any inquiries or feedback, please reach out to [Sumanta](https://github.com/sumantahitk).