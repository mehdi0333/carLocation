import express from "express";
import { accessToken } from "../middlewars/token.js";
import { goToProfile } from "../controllers/profil.js";

const router = express.Router();

router.get("/", accessToken, goToProfile);

export default router;
