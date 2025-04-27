import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import route from "./routes/authRoutes.js";
import urlRoute from "./routes/urlRoutes.js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// API routes
app.use("/api", route);
app.use("/url", urlRoute);

// Serve static files and catch-all route for frontend
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"))
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
