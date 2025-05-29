import express from "express";
import { verifyToken } from "../middlewars/token.js";
import { gotoRecherchePage, gotoRecherchePagePost } from "../controllers/recherche.js";

const router = express.Router();

router.get("/",verifyToken , gotoRecherchePage)
router.post("/",verifyToken , gotoRecherchePagePost)

export default router;
