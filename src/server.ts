import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./db/mongo";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to DB:", err);
    });
