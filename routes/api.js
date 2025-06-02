import express from "express";
import upload from "../utils/multer.js";
import { accessToken, verifyToken } from "../middlewars/token.js";
import { addCarImg, addDocuments, createNewCard } from "../controllers/car.js";
import accessAdmin, { accountStatus, carStatus } from "../controllers/admin.js";
import { changeProfileImg, updateProfile } from "../controllers/profil.js";
import {
  createReservation,
  reservationResponse,
} from "../controllers/reservations.js";
import {createNewRating} from "../controllers/rating.js"
const router = express.Router();

router.post("/car", accessToken, upload.array("images"), createNewCard);
router.post(
  "/car/documents",
  accessToken,
  upload.array("images"),
  addDocuments
);
router.post("/car/image", accessToken, upload.array("images"), addCarImg);
router.post("/reservation", accessToken, createReservation);
router.post("/createRating", accessToken, createNewRating);
router.put("/user/accountStatus", verifyToken, accessAdmin, accountStatus);
router.put("/user/carStatus", verifyToken, accessAdmin, carStatus);
router.put(
  "/profil/image",
  accessToken,
  upload.single("image"),
  changeProfileImg
);
router.put("/profil/information", accessToken, updateProfile);
router.put("/reservationResponse", accessToken, reservationResponse);
export default router;
