import { Router } from "express";
import authRouter from "./authRoutes.ts";
import sessionRoutes from "./sessionRoutes.ts";
import reviewRoutes from "./reviewRoutes.ts";

export const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/sessions", sessionRoutes);
mainRouter.use("/api/reviews", reviewRoutes);
