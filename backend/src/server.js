import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app= express()
const PORT=process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true //allow frontend to send cookies
}))

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("api/chat",chatRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB();
})