import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { mainRouter } from "./routes/index.ts";

export const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use(mainRouter);
