const express = require("express");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const cartWishlistRouter = require("./routes/cartWishlist");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
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

app.use(morgan("combined"));

app.use(express.json());

app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/api", cartWishlistRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log(`server started on port 4000`);
});
