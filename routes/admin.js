import express from "express";
import { accessToken } from "../middlewars/token.js";
import accessAdmin, {
  goToAdminDisputes,
  gotoAdminPage,
  goToAdminPlaints,
  goToAdminReports,
  gotoAdminUsersPage,
  gotoAnnonce,
  gotoModel,
  reservationDetail,
} from "../controllers/admin.js";
const router = express.Router();

router.get("/admin", accessToken, accessAdmin, gotoAdminPage);
router.get("/users", accessToken, accessAdmin, gotoAdminUsersPage);
router.get("/listings", accessToken, accessAdmin, gotoAnnonce);
router.get("/listings/:carId", accessToken, accessAdmin, gotoModel);
router.get("/disputes", accessToken, accessAdmin, goToAdminDisputes);
router.get("/reports", accessToken, accessAdmin, goToAdminReports);
router.get("/complaints", accessToken, accessAdmin, goToAdminPlaints);

export default router;
