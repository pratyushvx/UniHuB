import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// Route imports
import dashboardRoute from "./routes/dashboardRoute.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoute from "./routes/homeRoute.js";
import studyRoutes from "./routes/studyRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import talkRoutes from "./routes/talkRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

// Model import for chat
import Message from "./models/Message.js";

// App & server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Load .env
dotenv.config();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Auth middleware
import { userMiddleware } from "./utils/authMiddleware.js";
app.use(userMiddleware);//this needs 

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
};
connectDB();

// Default route
app.use("/", dashboardRoute);

// Routes
app.use("/", homeRoute);
app.use("/", authRoutes);
app.use("/", studyRoutes);
app.use("/", eventsRoutes);
app.use("/", placementRoutes);
app.use("/", talkRoutes);
app.use("/", adminRoutes);
app.use("/", announcementRoutes);
app.use("/", adminAuthRoutes);

// 🔁 Real-time Global Chat via Socket.IO
io.on("connection", (socket) => {
  console.log("🟢 User connected");

  socket.on("chatMessage", async (data) => {
    const newMsg = new Message({
      username: data.username,
      message: data.message,
    });
    await newMsg.save();
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// Start server with Socket.IO support
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
