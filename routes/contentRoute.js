import express from "express";
import {
  getNotes,
  getPyqs,
  getUploadNote,
  getUploadPyq,
  postUploadNote,
  postUploadPyq,
  getAnnouncements,
  upload
} from "../controller/contentController.js";

const router = express.Router();

// 📄 Notes and PYQs View
router.get("/notes", getNotes);
router.get("/pyqs", getPyqs);

// 📄 Upload Pages (GET)
router.get("/upload-note", getUploadNote);
router.get("/upload-pyq", getUploadPyq);

// 📥 Upload Handlers (POST)
// router.post("/upload-note", postUploadNote);
// router.post("/upload-pyq", postUploadPyq);

// 🔔 Announcements
router.get("/announcements", getAnnouncements);

// 📥 Upload Handlers (POST) — 🟡 Add multer here!
router.post("/upload-note", upload.single("file"), postUploadNote);
router.post("/upload-pyq", upload.single("file"), postUploadPyq);
export default router;
