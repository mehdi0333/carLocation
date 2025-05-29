import express from "express";
import { accessToken } from "../middlewars/token.js";
import {
  editCarConfirmation,
  editCarDocument,
  editCarInformation,
  editCarOptions,
  editCarPhoto,
  editCarTarification,
  submitCarConfirmation,
  submitCarDocument,
  submitCarImg,
  submitCarInformation,
  submitCarOptions,
  submitCarTarification,
} from "../controllers/editCar.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.get("/enregister-vehicule/:carId", accessToken, editCarInformation);
router.get("/enregister-options/:carId", accessToken, editCarOptions);
router.get(
  "/enregistrer-tarification/:carId",
  accessToken,
  editCarTarification
);
router.get("/enregistrer-photo/:carId", accessToken, editCarPhoto);
router.get("/enregistrer-document/:carId", accessToken, editCarDocument);
router.get(
  "/enregistrer-confirmation/:carId",
  accessToken,
  editCarConfirmation
);

router.put("/car-information", accessToken, submitCarInformation);
router.put(
  "/car-document",
  accessToken,
  upload.single("image"),
  submitCarDocument
);
router.put(
  "/car-img",
  accessToken,
  upload.array("image"),
  submitCarImg
);
router.put("/car-tarification", accessToken, submitCarTarification);
router.put("/car-confirmation", accessToken, submitCarConfirmation);
router.put("/car-options", accessToken, submitCarOptions);

export default router;
