const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const storeRoutes = require("./src/routes/store.routes");
const ratingRoutes = require("./src/routes/rating.routes");
const adminRoutes = require("./src/routes/admin.routes");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials:true}));
// if you want you can use origin link in env file
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use("/api/auth", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
