const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials:true}));
// if you want you can use origin link in env file
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use("/api/auth", authRoutes);
app.use("/api/user/", userRoutes);

module.exports = app;
