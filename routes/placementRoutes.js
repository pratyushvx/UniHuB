import express from "express";
import { viewCompanies, viewInternships, viewHackathons } from "../controller/placementController.js";

const router = express.Router();

// Placement routes - public access
router.get("/placement", (req, res) => res.render("menue/placement/placement_home"));
router.get("/placement/companies", viewCompanies);
router.get("/placement/internships", viewInternships);
router.get("/placement/hackathons", viewHackathons);

export default router; 