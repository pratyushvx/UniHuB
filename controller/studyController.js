import Note from "../models/Note.js";
import PYQ from "../models/Pyq.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and image files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// View all notes
export const viewNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("uploadedBy")
      .sort({ createdAt: -1 });

    res.render("menue/study/view_notes", { notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).render("error", { message: "Failed to load notes" });
  }
};

// Upload note
export const uploadNote = async (req, res) => {
  upload.single("noteFile")(req, res, async (err) => {
    if (err) {
      return res.status(400).render("menue/study/upload_note", {
        error: err.message,
      });
    }

    try {
      const { title, subject, semester, description } = req.body;
      const filePath = req.file
        ? path.posix.join("uploads", req.file.filename) // store relative path for public access
        : null;

      const note = new Note({
        title,
        subject,
        semester,
        description,
        filePath,
        uploadedBy: req.user?._id || null,
      });

      await note.save();
      res.redirect("/study?success=Note uploaded successfully!");
    } catch (error) {
      console.error("Error uploading note:", error);
      res.status(500).render("menue/study/upload_note", {
        error: "Failed to upload note",
      });
    }
  });
};

// Download note
export const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.filePath) {
      return res.status(404).render("error", { message: "File not found" });
    }

    const fileLocation = path.resolve("public", note.filePath);
    if (!fs.existsSync(fileLocation)) {
      return res.status(404).render("error", { message: "File not found" });
    }

    res.download(fileLocation, path.basename(fileLocation));
  } catch (error) {
    console.error("Error downloading note:", error);
    res.status(500).render("error", { message: "Download failed" });
  }
};

// View all PYQs
export const viewPyqs = async (req, res) => {
  try {
    const pyqs = await PYQ.find()
      .populate("uploadedBy")
      .sort({ createdAt: -1 });

    res.render("menue/study/pyq", { pyqs });
  } catch (error) {
    console.error("Error fetching PYQs:", error);
    res.status(500).render("error", { message: "Failed to load PYQs" });
  }
};

// Upload PYQ
export const uploadPyq = async (req, res) => {
  upload.single("pyqFile")(req, res, async (err) => {
    if (err) {
      return res.status(400).render("menue/study/upload_pyq", {
        error: err.message,
      });
    }

    try {
      const { title, subject, semester, year, description } = req.body;
      const filePath = req.file
        ? path.posix.join("uploads", req.file.filename)
        : null;

      const pyq = new PYQ({
        title,
        subject,
        semester,
        year,
        description,
        filePath,
        uploadedBy: req.user?._id || null,
      });

      await pyq.save();
      res.redirect("/study/pyqs?success=PYQ uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PYQ:", error);
      res.status(500).render("menue/study/upload_pyq", {
        error: "Failed to upload PYQ",
      });
    }
  });
};

// Download PYQ
export const downloadPyq = async (req, res) => {
  try {
    const pyq = await PYQ.findById(req.params.id);
    if (!pyq || !pyq.filePath) {
      return res.status(404).render("error", { message: "File not found" });
    }

    const fileLocation = path.resolve("public", pyq.filePath);
    if (!fs.existsSync(fileLocation)) {
      return res.status(404).render("error", { message: "File not found" });
    }

    res.download(fileLocation, path.basename(fileLocation));
  } catch (error) {
    console.error("Error downloading PYQ:", error);
    res.status(500).render("error", { message: "Download failed" });
  }
};
