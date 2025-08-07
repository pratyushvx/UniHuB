// View companies
export const viewCompanies = async (req, res) => {
  try {
    // Mock data for companies - in real app, this would come from database
    const companies = [
      {
        name: "Google",
        logo: "/img/google-logo.png",
        description: "Software Engineering Internship",
        requirements: "3rd year students, CGPA > 7.5",
        deadline: "2024-03-15",
        package: "₹50,000/month"
      },
      {
        name: "Microsoft",
        logo: "/img/microsoft-logo.png", 
        description: "Full Stack Developer",
        requirements: "Final year students, CGPA > 7.0",
        deadline: "2024-03-20",
        package: "₹45,000/month"
      },
      {
        name: "Amazon",
        logo: "/img/amazon-logo.png",
        description: "SDE Intern",
        requirements: "3rd year students, CGPA > 7.5",
        deadline: "2024-03-25",
        package: "₹55,000/month"
      }
    ];
    
    res.render("menue/placement/companies", { companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).render("error", { message: "Failed to load companies" });
  }
};

// View internships
export const viewInternships = async (req, res) => {
  try {
    // Mock data for internships
    const internships = [
      {
        company: "TechCorp",
        position: "Frontend Developer Intern",
        duration: "3 months",
        stipend: "₹25,000/month",
        location: "Remote",
        skills: ["React", "JavaScript", "HTML/CSS"]
      },
      {
        company: "DataFlow",
        position: "Data Science Intern", 
        duration: "6 months",
        stipend: "₹30,000/month",
        location: "Bangalore",
        skills: ["Python", "Machine Learning", "SQL"]
      }
    ];
    
    res.render("menue/placement/internships", { internships });
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).render("error", { message: "Failed to load internships" });
  }
};

// View hackathons
export const viewHackathons = async (req, res) => {
  try {
    // Mock data for hackathons
    const hackathons = [
      {
        name: "CodeFest 2024",
        organizer: "Tech Club",
        date: "2024-04-15",
        duration: "24 hours",
        prize: "₹50,000",
        theme: "AI for Social Good",
        registration: "Open"
      },
      {
        name: "HackTheFuture",
        organizer: "Innovation Hub",
        date: "2024-05-20",
        duration: "48 hours", 
        prize: "₹1,00,000",
        theme: "Sustainable Technology",
        registration: "Open"
      }
    ];
    
    res.render("menue/placement/hackathons", { hackathons });
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).render("error", { message: "Failed to load hackathons" });
  }
}; 