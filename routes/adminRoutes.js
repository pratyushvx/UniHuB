import express from "express";
import { 
  adminDashboard, 
  createAnnouncement, 
  viewAnnouncements, 
  deleteAnnouncement,
  createEvent,
  viewEvents,
  deleteEvent,
  createCompany,
  viewCompanies,
  createHackathon,
  viewHackathons
} from "../controller/adminController.js";

const router = express.Router();

// Admin Dashboard
router.get("/admin", adminDashboard);

// Announcement Management
router.get("/admin/announcements", viewAnnouncements);
router.post("/admin/announcements", createAnnouncement);
router.delete("/admin/announcements/:id", deleteAnnouncement);

// Event Management
router.get("/admin/events", viewEvents);
router.post("/admin/events", createEvent);
router.delete("/admin/events/:id", deleteEvent);

// Company Management
router.get("/admin/companies", viewCompanies);
router.post("/admin/companies", createCompany);

// Hackathon Management
router.get("/admin/hackathons", viewHackathons);
router.post("/admin/hackathons", createHackathon);

export default router; 