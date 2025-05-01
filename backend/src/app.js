import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet";



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false
}));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });  

// middlewares
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register


export { app };
