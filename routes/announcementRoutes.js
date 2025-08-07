import express from "express";
import { viewAnnouncements } from "../controller/announcementController.js";

const router = express.Router();

// Public announcement routes
router.get("/announcements", viewAnnouncements);

export default router; 