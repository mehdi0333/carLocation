import express from "express";
import { accessToken } from "../middlewars/token.js";
import {
  getoMainPropDashboard,
  getoPropChat,
  getoPropMyCars,
  getoPropReservations,
  getoPropRevenu,
  gotoPropDisponibility,
} from "../controllers/propDashboard.js";
import { reservationDetail } from "../controllers/admin.js";
const router = express.Router();

router.get("/dashboard-proprietaire", accessToken, getoMainPropDashboard);
router.get("/disponibilite", accessToken, gotoPropDisponibility);
router.get("/reservations", accessToken, getoPropReservations);
router.get("/revenus", accessToken, getoPropRevenu);
router.get("/mes-vehicules", accessToken, getoPropMyCars);
router.get("/chat", accessToken, getoPropChat);
router.get(
  "/reservation-details/:reservationId",
  accessToken,
  reservationDetail
);

export default router;
