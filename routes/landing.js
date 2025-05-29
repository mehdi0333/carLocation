import express from "express";
import landingPage, { logout, upcooming } from "../controllers/landing.js";
import { verifyToken } from "../middlewars/token.js";

const router = express.Router();

router.get("/", verifyToken, landingPage);
router.get("/logout", logout);
router.get("/upcomming", upcooming);

export default router;
