import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"
import homeRoute from "./routes/homeRoute.js"
import contentRoute from "./routes/contentRoute.js"
const app=express();
dotenv.config();
app.set("view engine", "ejs");
//connecting MongoDB 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
};
connectDB();
app.use(express.urlencoded({ extended: true }));//Required to Read Form Data 

app.use("/",homeRoute);
app.use("/",authRoutes);
app.use("/unihub",contentRoute);

const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
