import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()
dotenv.config();

app.use(express.json())

app.use(cookieParser())

// More permissive CORS configuration for development
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("MongoDB Connected");
} catch (error) {
    console.log(error)
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
