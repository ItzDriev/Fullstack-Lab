import express from "express";

import {
  register,
  login,
  logout,
  getProfile,
  uploadProfilePicture,
  getMe,
} from "../controllers/authController.ts";

import { authenticate } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authenticate, getProfile);
router.put("/profile/picture", authenticate, uploadProfilePicture);

//Might use later to keep user logged in
router.get("/me", authenticate, getMe);

export default router;
