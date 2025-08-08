import Note from "../models/Note.js";
import Event from "../models/Event.js";
import Company from "../models/company.js";
import User from "../models/user.js";

export const getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // reset time to 00:00:00

    const totalNotesCount = await Note.countDocuments();

    // Only count upcoming events from today onwards
    const upcomingEventsCount = await Event.countDocuments({
     
    });

    const companiesCount = await Company.countDocuments();

    const activeUsersCount = await User.countDocuments();

    console.log({
      totalNotesCount,
      upcomingEventsCount,
      companiesCount,
      activeUsersCount
    });

    res.render("dashboard", {
      stats: {
        totalNotes: totalNotesCount,
        upcomingEvents: upcomingEventsCount,
        companies: companiesCount,
        activeUsers: activeUsersCount,
      },
      user: req.user
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).send("Internal Server Error");
  }
};
