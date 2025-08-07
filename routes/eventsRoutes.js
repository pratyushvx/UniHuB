import express from "express";
import { viewEvents, createEvent } from "../controller/eventController.js";

const router = express.Router();

// Events routes
router.get("/events", viewEvents);
router.get("/events/create", (req, res) => res.render("menue/events/create_event"));
router.post("/events/create", createEvent);

export default router; 