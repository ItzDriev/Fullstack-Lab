import type { Request, Response } from "express";
import { Session } from "../models/Session.ts";
import { Review } from "../models/Review.ts";

export async function createSession(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;
    const { type, tierName, price, duration } = req.body;

    if (!type || !tierName || !price || !duration) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required" });
      return;
    }

    const session = await Session.create({
      userId,
      type,
      tierName,
      price,
      duration,
      coach: "Driev",
    });

    res.status(201).json({ success: true, data: session });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ success: false, error: "Failed to create session" });
  }
}

export async function getUpcomingSessions(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;

    const sessions = await Session.find({ userId, status: "upcoming" }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: sessions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch upcoming sessions" });
  }
}

export async function getSessionHistory(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;

    const sessions = await Session.find({ userId, status: "completed" }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: sessions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch session history" });
  }
}

export async function getAllUserSessions(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;

    const sessions = await Session.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch sessions" });
  }
}

export async function cancelSession(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;
    const { id } = req.params;

    const session = await Session.findOneAndDelete({ _id: id, userId });

    if (!session) {
      res.status(404).json({ success: false, error: "Session not found" });
      return;
    }

    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to cancel session" });
  }
}

export async function completeSession(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      res
        .status(400)
        .json({ success: false, error: "Rating must be between 1 and 5" });
      return;
    }

    const session = await Session.findOneAndUpdate(
      { _id: id, userId, status: "upcoming" },
      { status: "completed", rating },
      { new: true },
    );

    if (!session) {
      res
        .status(404)
        .json({ success: false, error: "Upcoming session not found" });
      return;
    }

    // Create a review in the separate collection
    await Review.create({
      sessionId: session._id,
      userId,
      rating,
    });

    res.json({ success: true, data: session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to complete session" });
  }
}
