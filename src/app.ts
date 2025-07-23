import express from "express";
import cors from "cors";
import rootRouter from "./routes";


const app = express();
const corsOptions = {
    origin:process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type, Authorization"]
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api",rootRouter)


export default app;