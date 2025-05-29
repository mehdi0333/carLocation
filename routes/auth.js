import express from "express";
import { login, postLogin, postRegister, register } from "../controllers/auth.js";

const router = express.Router();

// get request for login and register
router.get("/connexion", login);
router.get("/inscription", register);


// post request for login and register
router.post("/connexion", postLogin)
router.post("/register", postRegister)




export default router;
