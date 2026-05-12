import type { Request, Response } from "express";
import { Review } from "../models/Review.ts";

export async function getUserReviews(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;

    const reviews = await Review.find({ userId })
      .populate("sessionId", "tierName type coach createdAt")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
}

export async function getReviewStats(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;

    const reviews = await Review.find({ userId });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;
    const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

    res.json({
      success: true,
      data: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        fiveStarCount,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch review stats" });
  }
}

export async function deleteReview(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;
    const { id } = req.params;

    const review = await Review.findOneAndDelete({ _id: id, userId });

    if (!review) {
      res.status(404).json({ success: false, error: "Review not found" });
      return;
    }

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete review" });
  }
}
