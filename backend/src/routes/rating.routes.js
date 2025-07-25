
const express = require("express");
const router = express.Router();
// const authenticate = require("../middlewares/authenticate");

const { createOrUpdateRating } = require("../controllers/rating.controller");
const authenticateUser = require("../middleware/auth.middleware");

router.post("/", authenticateUser, createOrUpdateRating);

module.exports = router;
