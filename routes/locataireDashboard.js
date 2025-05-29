import express from "express";
import { accessToken } from "../middlewars/token.js";
import {
  getoLocataireDashboard,
  getoLocataireDashboardModel,
} from "../controllers/locataireDashboard.js";

const router = express.Router();

router.get("/dashboard-locataire", accessToken, getoLocataireDashboard);
router.get(
  "/dashboard-locataire/:carId",
  accessToken,
  getoLocataireDashboardModel
);

export default router;
