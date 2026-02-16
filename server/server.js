import dns from 'dns'

dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
    "1.1.1.1"
]);




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import path from 'path';
import authRouter from "./routes/authRoutes.js"
import incomeRouter from './routes/incomeRoutes.js';
import expenseRouter from './routes/expenseRoutes.js';
import dashRouter from './routes/dashboardRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/exports", express.static(path.join(process.cwd(), "exports")));

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders:["Content-Type", "Authorization"]
//   })
// );

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://expenso-your-personal-expense-track.vercel.app"
  ],
  credentials: true
}));




connectDB();


app.get("/", (req, res) => {
  res.send( "Server is running 🚀" );
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRouter )
app.use("/api/v1/dashboard",dashRouter)
app.use("/api/v1/expense", expenseRouter)



app.use("/uploads", express.static("uploads"));




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


