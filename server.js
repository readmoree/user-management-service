const express = require("express");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const publicRouter = require("./routes/public");
const cartWishlistRouter = require("./routes/cartWishlist");
const morgan = require("morgan");
<<<<<<< Updated upstream
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");
const session = require("express-session");
=======
const cors = require("cors");
const session = require("express-session");

>>>>>>> Stashed changes
require("dotenv").config();
const app = express();

app.use(
  cors({
<<<<<<< Updated upstream
    origin: "https://readmoree.com", // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
// Handle preflight requests for CORS
=======
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
>>>>>>> Stashed changes
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to `true` if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Helps maintain session in cross-origin requests
      maxAge: 2 * 60 * 1000, // 10 minutes
    },
  })
);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
app.use(morgan("combined"));

app.use(express.json());

app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/public", publicRouter);
app.use("/api", cartWishlistRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log(`server started on port 4000`);
});
