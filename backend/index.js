import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import { connectDB } from "./config/database-config.js";

dotenv.config(); // 🔥 MUST

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local testing
      "https://interv-u-delta.vercel.app", // deployed frontend
    ],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

// Server
app.listen(process.env.PORT || 9000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
