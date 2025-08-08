import Announcement from "../models/Announcement.js";
import Event from "../models/Event.js";
import Company from "../models/company.js";
import Internship from "../models/internship.js";
import Hackathon from "../models/hackathon.js";
import User from "../models/user.js";

/* ===== Admin Panel ===== */
export const adminPanel = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const data = {
      announcements: await Announcement.find()
        .populate("author", "username")
        .sort({ createdAt: -1 }),
      events: await Event.find().sort({ createdAt: -1 }),
      companies: await Company.find().sort({ datePosted: -1 }),
      internships: await Internship.find().sort({ datePosted: -1 }),
      hackathons: await Hackathon.find().sort({ datePosted: -1 }),
      totalUsers: await User.countDocuments()
    };
    res.render("admin/admin_panel", { data });
  } catch (err) {
    console.error("Error loading admin panel:", err);
    res.status(500).send("Error loading admin panel");
  }
};

/* ===== Announcements ===== */
export const addAnnouncement = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const { title, content, priority } = req.body;
    const announcement = new Announcement({
      title,
      content,
      priority,
     author: "admin"
    });
    await announcement.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding announcement:", err);
    res.redirect("/admin?error=announcement");
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.redirect("/admin?error=delete_announcement");
  }
};

/* ===== Events ===== */
export const addEvent = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const { title, description, date, time, venue, organizer } = req.body;
    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      organizer
    });
    await event.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding event:", err);
    res.redirect("/admin?error=event");
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting event:", err);
    res.redirect("/admin?error=delete_event");
  }
};

/* ===== Companies ===== */
export const addCompany = async (req, res) => {
  try {
    const { name, description, website, location, eligibility } = req.body;
    const company = new Company({ name, description, website, location, eligibility });
    await company.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding company:", err);
    res.redirect("/admin?error=company");
  }
};

export const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting company:", err);
    res.redirect("/admin?error=delete_company");
  }
};

/* ===== Internships ===== */
export const addInternship = async (req, res) => {
  try {
    const { title, company, description, duration, stipend, applyLink } = req.body;
    const internship = new Internship({ title, company, description, duration, stipend, applyLink });
    await internship.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding internship:", err);
    res.redirect("/admin?error=internship");
  }
};

export const deleteInternship = async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting internship:", err);
    res.redirect("/admin?error=delete_internship");
  }
};

/* ===== Hackathons ===== */
export const addHackathon = async (req, res) => {
  try {
    const { name, description, organizer, startDate, endDate, prize, applyLink } = req.body;
    const hackathon = new Hackathon({ name, description, organizer, startDate, endDate, prize, applyLink });
    await hackathon.save();
    res.redirect("/admin");
  } catch (err) {
    console.error("Error adding hackathon:", err);
    res.redirect("/admin?error=hackathon");
  }
};

export const deleteHackathon = async (req, res) => {
  try {
    await Hackathon.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting hackathon:", err);
    res.redirect("/admin?error=delete_hackathon");
  }
};
