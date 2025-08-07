import User from "../models/user.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
}).single('photo');

export function adminLogin(req, res) {
  const error = req.query.error;
  res.render("admin/login", { error });
}

export function adminSignup(req, res) {
  const error = req.query.error;
  res.render("admin/signup", { error });
}

export async function adminVerifySignup(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }

    try {
      const { username, email, pass, sem, branch, phoneno } = req.body;
      
      // Check if user already exists
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).send("Email already exists");
      }

      // Handle photo upload
      let photoPath = "/img/default-avatar.png"; // default photo
      if (req.file) {
        photoPath = "/uploads/" + req.file.filename;
      }

      // Create new admin user
      const newAdmin = new User({
        username,
        email,
        password: pass,
        photo: photoPath,
        isAdmin: true, // Set as admin
        sem,
        branch,
        phoneno
      });

      await newAdmin.save();
      res.send("Admin signup successful!");
    } catch (err) {
      console.error(err);
      const msg = err.errors
        ? Object.values(err.errors).map(e => e.message).join(", ")
        : "Admin signup failed";
      res.status(400).send(msg);
    }
  });
}

export async function adminVerifyLogin(req, res) {
  try {
    const { email, pass } = req.body;
    
    if (!email || !pass) {
      return res.status(400).send("Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(400).send("Access denied. Admin privileges required.");
    }

    // Simple password comparison
    if (user.password !== pass) {
      return res.status(400).send("Invalid email or password");
    }

    // Redirect to admin dashboard
    res.redirect("/admin");
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).send("Login error");
  }
} 