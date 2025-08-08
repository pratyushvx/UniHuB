import Company from "../models/company.js";
import Internship from "../models/internship.js";
import Hackathon from "../models/hackathon.js";

export const viewCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ datePosted: -1 });
    res.render("menue/placement/companies", { companies });
  } catch (error) {
    res.status(500).send("Error fetching companies");
  }
};

export const viewInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ datePosted: -1 });
    res.render("menue/placement/internships", { internships });
  } catch (error) {
    res.status(500).send("Error fetching internships");
  }
};

export const viewHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ datePosted: -1 });
    res.render("menue/placement/hackathons", { hackathons });
  } catch (error) {
    res.status(500).send("Error fetching hackathons");
  }
};
