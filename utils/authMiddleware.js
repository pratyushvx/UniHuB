import { getCurrentUser } from "../controller/authController.js";

// Middleware to add user data to all views
export const userMiddleware = (req, res, next) => {
  const user = getCurrentUser(req);
  res.locals.user = user;
  next();
};

// Middleware for protected routes
export const requireAuth = (req, res, next) => {
  const user = getCurrentUser(req);
  if (!user) {
    return res.redirect("/login?error=Please login to continue");
  }
  next();
};

// Middleware for admin routes
export const requireAdmin = (req, res, next) => {
  const user = getCurrentUser(req);
  if (!user) {
    return res.redirect("/login?error=Please login to continue");
  }
  if (!user.isAdmin) {
    return res.redirect("/dashboard?error=Admin access required");
  }
  next();
}; 