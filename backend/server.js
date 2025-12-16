import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import sequelize from "./config/database.js";
import applicantRoutes from "./routes/applicants.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/applicants", applicantRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testConnection();
  await sequelize.sync(); 
  console.log("Database synced!");
});
