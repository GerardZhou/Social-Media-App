import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
const app = express();

app.use(express.json()); // middleware used to parse req body
app.use(express.urlencoded({ extended: true })); // middleware used to parse form data (urlencoded)

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
  connectMongoDB();
});
