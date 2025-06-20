import express from "express";
import { accessToken } from "../middlewars/token.js";
import { changePlaintStatus, createPlaint, goToPlaint } from "../controllers/plainte.js";
import upload from "../utils/multer.js";
import accessAdmin from "../controllers/admin.js";
const router = express.Router();

router.get("/aide", accessToken, goToPlaint);
router.put("/api/changePlantStatus", accessToken, accessAdmin, changePlaintStatus);
router.post("/api/plaint", upload.array("image"), accessToken, createPlaint);
export default router;
