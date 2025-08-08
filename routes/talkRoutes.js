import express from "express";
import { talkHomePage, globalChatPage } from "../controller/talkController.js";

const router = express.Router();

router.get("/talk", talkHomePage);             // talk_home.ejs
router.get("/talk/chat", globalChatPage);      // chat.ejs
//router.post("/talk/chat", sendMessage);        // POST message
// router.get("/talk/chat", (req, res) => {
//     res.redirect("/talk/chat");
//     });
export default router;
