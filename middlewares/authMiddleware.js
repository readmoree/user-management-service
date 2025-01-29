const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  // Get the token from headers
  const authHeader = req.headers["authorization"]; // Usually "Bearer <token>"

  if (["/auth/register", "/auth/login"].includes(req.url)) {
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

      const [user] = await db.query(
        "SELECT * FROM customer WHERE customer_id = ?",
        [decoded.customerId]
      );
      if (user.length == 0) {
        return res.status(404).json({
          status: "error",
          message: "User does not exist",
        });
      }

      console.log(decoded);
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
