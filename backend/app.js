const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const storeRoutes = require("./src/routes/store.routes");
const ratingRoutes = require("./src/routes/rating.routes");
const adminRoutes = require("./src/routes/admin.routes");
const ownerRoutes = require("./src/routes/owner.routes");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

app.use(express.json());
// app.use(cors({origin:"http://localhost:5173", credentials:true}));
// app.use(cors({origin:"https://pittu-store-rating-app-git-master-pittu777s-projects.vercel.app", credentials:true, 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

const allowedOrigins = [
  "https://pittu-store-rating-app.vercel.app",
  "https://pittu-store-rating-app-git-master-pittu777s-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use("/api/auth", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes)

module.exports = app;
