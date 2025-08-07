import Event from "../models/Event.js";

// View all events
export const viewEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render("menue/events/view_events", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).render("error", { message: "Failed to load events" });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, organizer } = req.body;
    
    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      organizer,
      createdBy: req.user._id,
    });

    await event.save();
    res.redirect("/events?success=Event created successfully!");
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).render("menue/events/create_event", {
      error: "Failed to create event",
    });
  }
}; 