import express from "express";
import { getDashboard } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/dashboard", getDashboard);

export default router;
