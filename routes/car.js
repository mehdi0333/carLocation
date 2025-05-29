import express from "express";
import {
  annoncePage,
  deleteCar,
  gotoConfirmationCarPage,
  gotoDocumentCarPage,
  gotoNewCarPage,
  gotoOption,
  gotoPhotoCarPage,
  gotoTraficationCarPage,
} from "../controllers/car.js";
import editCar from "./editCar.js";
import { accessToken, verifyToken } from "../middlewars/token.js";

const router = express.Router();

router.get("/enregister-vehicule", accessToken, gotoNewCarPage);
router.get("/enregister-options", accessToken, gotoOption);
router.get("/enregistrer-tarification", accessToken, gotoTraficationCarPage);
router.get("/enregistrer-photo", accessToken, gotoPhotoCarPage);
router.get("/enregistrer-document", accessToken, gotoDocumentCarPage);
router.get("/enregistrer-confirmation", accessToken, gotoConfirmationCarPage);
router.get("/annonce/:carId", verifyToken, annoncePage);
router.get("/car/delete/:carId", verifyToken, deleteCar);
router.use("/edit",editCar)


export default router;
