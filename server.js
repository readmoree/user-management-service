const express = require("express");
const userRouter = require("./routes/user");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

app.use(morgan("combined"));

app.use(express.json());

app.use("/user", userRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log(`server started on port 4000`);
});
