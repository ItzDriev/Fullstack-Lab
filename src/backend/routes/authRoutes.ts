import express from "express";
import { register, login, logout } from "../controllers/authController.ts";
import { authenticate } from "../middleware/jwtMiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//Might use later to keep user logged in
router.get("/me", authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
