const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user/", userRoutes)

module.exports = app;
