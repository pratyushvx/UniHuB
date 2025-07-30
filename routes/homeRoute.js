import express from "express"
import homeController from "../controller/homeController.js";
const router=express();
router.get("/",homeController);
export default router;