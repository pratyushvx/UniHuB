import express from "express"
import homeController from "../controller/homeController.js";

const router = express.Router();

router.get("/", homeController);
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

export default router;