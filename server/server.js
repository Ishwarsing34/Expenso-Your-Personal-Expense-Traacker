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
import authRouter from "./routes/authRoutes.js"


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"]
  })
);




connectDB();


app.get("/", (req, res) => {
  res.send( "Server is running 🚀" );
});

app.use("/api/auth", authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


