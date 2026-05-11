import express from "express";
import {
  createSession,
  getUpcomingSessions,
  getSessionHistory,
  getAllUserSessions,
  cancelSession,
} from "../controllers/sessionController.ts";
import { authenticate } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.post("/", authenticate, createSession);
router.get("/", authenticate, getAllUserSessions);
router.get("/upcoming", authenticate, getUpcomingSessions);
router.get("/history", authenticate, getSessionHistory);
router.delete("/:id", authenticate, cancelSession);

export default router;
