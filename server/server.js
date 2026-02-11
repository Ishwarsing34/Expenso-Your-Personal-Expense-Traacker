import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./configs/db.js";

import authRouter from "./routes/authRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js"
import dashRouter from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/exports", express.static(path.join(process.cwd(), "exports")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/dashboard", dashRouter);
app.use("/api/v1/expense", expenseRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
