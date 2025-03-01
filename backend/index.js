// imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
// database connection
mongoose
  .connect("mongodb://localhost:27017/Sport")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// basic setup
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRouter);

// Error handler
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(err.status);
  res.json(err);
  next(err);
});

app.listen(PORT, function () {
  console.log("listening on PORT:", PORT);
});
