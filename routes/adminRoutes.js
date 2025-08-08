import express from "express";
import {
  adminPanel,
  addAnnouncement,
  deleteAnnouncement,
  addEvent,
  deleteEvent,
  addCompany,
  deleteCompany,
  addInternship,
  deleteInternship,
  addHackathon,
  deleteHackathon
} from "../controller/adminController.js";

const router = express.Router();

// Admin Panel View
router.get("/admin", adminPanel);

// Announcements
router.post("/admin/announcements", addAnnouncement);
router.post("/admin/announcements/delete/:id", deleteAnnouncement);

// Events
router.post("/admin/events", addEvent);
router.post("/admin/events/delete/:id", deleteEvent);

// Companies
router.post("/admin/companies", addCompany);
router.post("/admin/companies/delete/:id", deleteCompany);

// Internships
router.post("/admin/internships", addInternship);
router.post("/admin/internships/delete/:id", deleteInternship);

// Hackathons
router.post("/admin/hackathons", addHackathon);
router.post("/admin/hackathons/delete/:id", deleteHackathon);

export default router;
