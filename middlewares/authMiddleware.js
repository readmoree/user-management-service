const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  // Get the token from headers
  console.log("header" + req.headers);
  const authHeader = req.headers["authorization"]; // Usually "Bearer <token>"

  if (
    ["/auth/register", "/auth/login", "/auth/verify-email"].includes(req.url)
  ) {
    next();
  } else {
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: "error", message: "Missing token" });
    }

    try {
      // Extract token from "Bearer <token>"
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      console.log(decoded);

      const [user] = await db.query(
        "SELECT * FROM customer WHERE customer_id = ?",
        [decoded.customerId]
      );
      if (user.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User does not exist",
        });
      }

      if (req.url.startsWith("/admin") && user[0].role !== "ADMIN") {
        return res.status(400).json({
          status: "error",
          message: "No admin privileges",
        });
      }

      req.user = decoded; // Attach user info to request object
      next(); // Proceed to next middleware or route
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid or expired token" });
    }
  }
};

module.exports = authMiddleware;
