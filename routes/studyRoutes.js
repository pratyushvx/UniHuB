import express from "express";
import { uploadNote, viewNotes, uploadPyq, viewPyqs } from "../controller/studyController.js";

const router = express.Router();

// Study module routes - no authentication required
router.get("/study", viewNotes);
router.get("/study/upload-note", (req, res) => res.render("menue/study/upload_note"));
router.post("/study/upload-note", uploadNote);

// PYQ routes
router.get("/study/pyqs", viewPyqs);
router.get("/study/upload-pyq", (req, res) => res.render("menue/study/upload_pyq"));
router.post("/study/upload-pyq", uploadPyq);

export default router; 