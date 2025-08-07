import Event from "../models/Event.js";
import Announcement from "../models/Announcement.js";
import User from "../models/user.js";

// Admin Dashboard
export const adminDashboard = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalEvents: await Event.countDocuments(),
      totalAnnouncements: await Announcement.countDocuments(),
      recentAnnouncements: await Announcement.find().sort({ createdAt: -1 }).limit(5)
    };
    
    res.render("admin/dashboard", { stats });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).send("Server error");
  }
};

// Announcement Management
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    
    const announcement = new Announcement({
      title,
      content,
      priority: priority || 'medium',
      author: req.user._id // Assuming user is logged in
    });

    await announcement.save();
    res.redirect("/admin/announcements?success=Announcement created successfully");
  } catch (error) {
    console.error("Create announcement error:", error);
    res.redirect("/admin/announcements?error=Failed to create announcement");
  }
};

export const viewAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.render("admin/announcements", { announcements });
  } catch (error) {
    console.error("View announcements error:", error);
    res.status(500).send("Server error");
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.redirect("/admin/announcements?success=Announcement deleted successfully");
  } catch (error) {
    console.error("Delete announcement error:", error);
    res.redirect("/admin/announcements?error=Failed to delete announcement");
  }
};

// Event Management
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, organizer } = req.body;
    
    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      organizer,
      createdBy: req.user._id
    });

    await event.save();
    res.redirect("/admin/events?success=Event created successfully");
  } catch (error) {
    console.error("Create event error:", error);
    res.redirect("/admin/events?error=Failed to create event");
  }
};

export const viewEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username').sort({ createdAt: -1 });
    res.render("admin/events", { events });
  } catch (error) {
    console.error("View events error:", error);
    res.status(500).send("Server error");
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect("/admin/events?success=Event deleted successfully");
  } catch (error) {
    console.error("Delete event error:", error);
    res.redirect("/admin/events?error=Failed to delete event");
  }
};

// Company Management
export const createCompany = async (req, res) => {
  try {
    const { name, description, website, salary, requirements } = req.body;
    
    // For now, we'll store companies in a simple format
    // You can create a separate Company model later
    const company = {
      name,
      description,
      website,
      salary,
      requirements,
      createdAt: new Date()
    };

    // Store in a simple way for now
    // You might want to create a Company model
    res.redirect("/admin/companies?success=Company added successfully");
  } catch (error) {
    console.error("Create company error:", error);
    res.redirect("/admin/companies?error=Failed to add company");
  }
};

export const viewCompanies = async (req, res) => {
  try {
    // Mock data for now
    const companies = [
      { name: "Google", description: "Software Engineer", package: "15 LPA", requirements: "B.Tech CSE" },
      { name: "Microsoft", description: "Full Stack Developer", package: "12 LPA", requirements: "B.Tech IT" }
    ];
    
    res.render("admin/companies", { companies });
  } catch (error) {
    console.error("View companies error:", error);
    res.status(500).send("Server error");
  }
};

// Hackathon Management
export const createHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate, prizes, registrationLink } = req.body;
    
    // Mock creation for now
    res.redirect("/admin/hackathons?success=Hackathon added successfully");
  } catch (error) {
    console.error("Create hackathon error:", error);
    res.redirect("/admin/hackathons?error=Failed to add hackathon");
  }
};

export const viewHackathons = async (req, res) => {
  try {
    // Mock data for now
    const hackathons = [
      { name: "CodeFest 2024", description: "Annual coding competition", startDate: "2024-03-15", prizes: "₹50,000" },
      { name: "InnovateTech", description: "Innovation challenge", startDate: "2024-04-01", prizes: "₹30,000" }
    ];
    
    res.render("admin/hackathons", { hackathons });
  } catch (error) {
    console.error("View hackathons error:", error);
    res.status(500).send("Server error");
  }
}; 