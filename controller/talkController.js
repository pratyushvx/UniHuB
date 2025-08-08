import Message from "../models/Message.js";

// Render home page for talk section
export const talkHomePage = (req, res) => {
  res.render("menue/talk/talk_home");
};

// Render global chat page with messages
export const globalChatPage = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
    res.render("menue/talk/chat", {
      messages,
      username: req.user?.username || "Guest"
    });
  } catch (err) {
    console.error("Error loading chat:", err);
    res.status(500).send("Error loading chat");
  }
};
// Send a new message
// export const sendMessage = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).send("Unauthorized: User not logged in");
//     }

//     const newMessage = new Message({
//       username: req.user.name,
//       userId: req.user._id,
//       message: req.body.message,   // 🟢 Matches input name
//       timestamp: new Date()
//     });

//     await newMessage.save();
//     res.redirect("/talk/chat");
//   } catch (err) {
//     console.error("Error sending message:", err);
//     res.status(500).send("Failed to send message");
//   }
// };
