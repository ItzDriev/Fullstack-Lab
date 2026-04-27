import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWTModel from "../models/JWT.ts";
import { User } from "../models/User.ts";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { fullName, username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res
        .status(400)
        .json({ success: false, error: "Username or email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: { userId: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Registration failed" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });

    const user = await User.findOne({ username });
    console.log("User found:", user);

    if (!user) {
      res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
      return;
    }

    const token = JWTModel.sign({ userId: user._id, username: user.username });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: { userId: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals.jwt?.userId || (req as any).user?.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
}
