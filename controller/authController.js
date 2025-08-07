import User from "../models/user.js";
import multer from "multer";
import path from "path";

// Simple in-memory session store (in production, use Redis or database)
const sessions = new Map();

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

export function login(req, res) {
  const error = req.query.error;
  res.render("auth/login", { error });
}

export function signup(req, res) {
  res.render("auth/signup");
}

export async function verifySignup(req, res) {
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

      // Create new user with simple password
      const newUser = new User({
        username,
        email,
        password: pass,
        photo: photoPath,
        sem,
        branch,
        phoneno
      });

      await newUser.save();
      res.send("Signup successful!");
    } catch (err) {
      console.error(err);
      const msg = err.errors
        ? Object.values(err.errors).map(e => e.message).join(", ")
        : "Signup failed";
      res.status(400).send(msg);
    }
  });
}

export async function verifyLogin(req, res) {
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

    // Simple password comparison
    if (user.password !== pass) {
      return res.status(400).send("Invalid email or password");
    }

    // Create session
    const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessions.set(sessionId, {
      userId: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      photo: user.photo
    });

    // Set session cookie
    res.cookie('sessionId', sessionId, { 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true 
    });

    // Redirect to dashboard
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Login error");
  }
}

export function logout(req, res) {
  const sessionId = req.cookies?.sessionId;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie('sessionId');
  res.redirect("/");
}

// Profile functions
export async function profile(req, res) {
  try {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId || !sessions.has(sessionId)) {
      return res.redirect("/login?error=Please login to view profile");
    }

    const session = sessions.get(sessionId);
    const user = await User.findById(session.userId);
    
    if (!user) {
      return res.redirect("/login?error=User not found");
    }

    res.render("auth/profile", { user });
  } catch (error) {
    console.error("Profile error:", error);
    res.redirect("/login?error=Error loading profile");
  }
}

export async function updateProfile(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }

    try {
      const sessionId = req.cookies?.sessionId;
      if (!sessionId || !sessions.has(sessionId)) {
        return res.redirect("/login?error=Please login to update profile");
      }

      const session = sessions.get(sessionId);
      const { username, sem, branch, phoneno } = req.body;

      const updateData = { username, sem, branch, phoneno };
      
      // Handle photo upload
      if (req.file) {
        updateData.photo = "/uploads/" + req.file.filename;
      }

      await User.findByIdAndUpdate(session.userId, updateData);
      
      // Update session
      session.username = username;
      if (req.file) {
        session.photo = updateData.photo;
      }
      sessions.set(sessionId, session);

      res.redirect("/profile?success=Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      res.redirect("/profile?error=Failed to update profile");
    }
  });
}

// Helper function to get current user
export function getCurrentUser(req) {
  const sessionId = req.cookies?.sessionId;
  if (sessionId && sessions.has(sessionId)) {
    return sessions.get(sessionId);
  }
  return null;
}