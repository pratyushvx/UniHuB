import express from "express";
import { login, signup,verifyLogin,verifySignup,logout } from "../controller/authController.js";

const router = express.Router();

router.get("/login", login);
router.get("/signup", signup);
//handle Post Request
router.post("/login",verifyLogin)
router.post("/signup",verifySignup)
//handle Logout
router.get("/logout",logout);

export default router;
