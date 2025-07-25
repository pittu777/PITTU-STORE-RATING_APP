

const express = require("express");
const router = express.Router();
const adminController = require("./../controllers/admin.controller");
const authenticateUser = require("./../middleware/auth.middleware");
const authorizeAdmin = require("./../middleware/auth.authorizeAdmin");

router.use(authenticateUser, authorizeAdmin); // 🔐 Admin-only access

router.get("/users", adminController.getAllUsers);
router.get("/stores", adminController.getAllStores);
router.post("/stores", adminController.createStore);
router.patch("/users/:id/role", adminController.updateUserRole);
router.get("/owners", adminController.getOwners);
router.delete("/stores/:id", adminController.deleteStore);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
