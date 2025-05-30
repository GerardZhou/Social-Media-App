import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(cors(corsOption));

app.use(express.json({ limit: "5mb" })); // middleware used to parse req body
app.use(express.urlencoded({ extended: true })); // middleware used to parse form data (urlencoded)

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
  connectMongoDB();
});
