import multer from "multer";
import path from "path";
import Note from "../models/Note.js";
import Pyq from "../models/Pyq.js";
import Announcement from "../models/Announcement.js";

// 🧩 Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });

// 📄 Display all Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render("menue/notes", { notes: notes || [] });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.render("menue/notes", { notes: [], error: "Error loading notes" });
  }
};

// 📄 Display all PYQs
export const getPyqs = async (req, res) => {
  try {
    const pyqs = await Pyq.find().sort({ createdAt: -1 });
    res.render("menue/pyq", { pyqs: pyqs || [] });
  } catch (err) {
    console.error("Error fetching PYQs:", err);
    res.render("menue/pyq", { pyqs: [], error: "Error loading PYQs" });
  }
};

// 📥 Show Upload Note Form
export const getUploadNote = (req, res) => {
  res.render("menue/uploadNote");
};

// 📥 Show Upload PYQ Form
export const getUploadPyq = (req, res) => {
  res.render("menue/uploadPyq");
};

// ✅ Upload Note Handler
export const postUploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { title, subject, semester, description } = req.body;
    
    if (!title || !subject || !semester || !description) {
      return res.status(400).send("All fields are required");
    }

    const fileUrl = "/uploads/" + req.file.filename;
    const fileType = req.file.mimetype.startsWith("image") ? "image" : "pdf";

    await Note.create({ title, subject, semester, description, fileUrl, fileType });
    res.redirect("/unihub/notes");
  } catch (err) {
    console.error("Error uploading note:", err);
    res.status(500).send("Error uploading note. Please try again.");
  }
};

// ✅ Upload PYQ Handler
export const postUploadPyq = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { title, subject, semester, description } = req.body;
    
    if (!title || !subject || !semester || !description) {
      return res.status(400).send("All fields are required");
    }

    const fileUrl = "/uploads/" + req.file.filename;
    const fileType = req.file.mimetype.startsWith("image") ? "image" : "pdf";

    await Pyq.create({ title, subject, semester, description, fileUrl, fileType });
    res.redirect("/unihub/pyqs");
  } catch (err) {
    console.error("Error uploading PYQ:", err);
    res.status(500).send("Error uploading PYQ. Please try again.");
  }
};

// 🔔 Show All Announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.render("menue/announcements", { announcements: announcements || [] });
  } catch (err) {
    console.error("Error loading announcements:", err);
    res.render("menue/announcements", { announcements: [], error: "Error loading announcements" });
  }
};
