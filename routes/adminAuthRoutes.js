import express from "express";
import { adminLogin, adminSignup, adminVerifyLogin, adminVerifySignup } from "../controller/adminAuthController.js";

const router = express.Router();

// Admin authentication routes
router.get("/admin/login", adminLogin);
router.get("/admin/signup", adminSignup);
router.post("/admin/login", adminVerifyLogin);
router.post("/admin/signup", adminVerifySignup);

export default router; 