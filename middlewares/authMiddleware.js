const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  // Get the token from headers
  const authHeader = req.headers["authorization"]; // Usually "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ status: "error", message: "Missing token" });
  }

  try {
    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.user = decoded; // Attach user info to request object
    next(); // Proceed to next middleware or route
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
