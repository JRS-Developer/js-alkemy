const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = require("./config");
const budgetRouter = require("./routes/budget");
const authRouter = require("./routes/auth");
const checkToken = require("./middlewares/Token");

const app = express();
// config
app.set("port", PORT);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/budget", checkToken, budgetRouter);
app.use("/api/auth", authRouter);

module.exports = app;
