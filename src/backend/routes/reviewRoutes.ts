import express from "express";
import {
  getUserReviews,
  getReviewStats,
  deleteReview,
} from "../controllers/reviewController.ts";
import { authenticate } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.get("/mine", authenticate, getUserReviews);
router.get("/stats", authenticate, getReviewStats);
router.delete("/:id", authenticate, deleteReview);

export default router;
