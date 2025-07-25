const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  adminLogin,
} = require("./../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
