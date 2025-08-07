import Announcement from "../models/Announcement.js";

export const viewAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .populate('author', 'username')
      .sort({ priority: -1, createdAt: -1 });
    
    res.render("menue/announcements", { announcements });
  } catch (error) {
    console.error("View announcements error:", error);
    res.status(500).send("Server error");
  }
}; 