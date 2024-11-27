import express from "express";
import { checkAuth, signup } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/auth.controller.js";
import { forgotpassword } from "../controllers/auth.controller.js";
import { resetPassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login );
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password/:token", resetPassword);

export default router;