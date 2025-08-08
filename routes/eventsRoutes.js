import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// View all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }); // Latest first
    res.render("menue/events/events", { events });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading events");
  }
});

export default router;
