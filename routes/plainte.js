import express from "express";
import { accessToken } from "../middlewars/token.js";
import { createPlaint, goToPlaint } from "../controllers/plainte.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.get("/aide", accessToken, goToPlaint);
router.post("/api/plaint",upload.single('image'), accessToken , createPlaint)
export default router;
