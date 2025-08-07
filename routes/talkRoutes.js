import express from "express";
import { talkHomePage, globalChatPage, sendMessage } from "../controller/talkController.js";

const router = express.Router();

router.get("/talk", talkHomePage);             // talk_home.ejs
router.get("/talk/chat", globalChatPage);      // chat.ejs
router.post("/talk/chat", sendMessage);        // POST message

export default router;
