import dotenv from 'dotenv';
dotenv.config(); 
import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import './config/container';
import fullRouter from './routes/router';

const app = express();
const PORT = process.env.PORT || 4040;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MongoDB URI is not set in environment variables.");
  process.exit(1);
}



mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // console.log("🔍 Connected to:", MONGO_URI); // Add this
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.use(cors({ origin:process.env.CLIENT_URL, credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',fullRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
