import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import route from "./routes/authRoutes.js";
import urlRoute from "./routes/urlRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api", route);
app.use("/url", urlRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
