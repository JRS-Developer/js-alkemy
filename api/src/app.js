const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = require("./config");
const budgetRouter = require("./routes/budget");

const app = express();
// config
app.set("port", PORT);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/budget", budgetRouter);

module.exports = app;
