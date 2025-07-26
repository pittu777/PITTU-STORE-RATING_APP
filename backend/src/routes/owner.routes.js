


const express = require("express");
const router = express.Router();
const authenticateUser = require("./../middleware/auth.middleware");
const authorizeOwner = require("./../middleware/auth.authorizeOwner");
const ownerController = require("./../controllers/owner.controller");

router.use(authenticateUser, authorizeOwner);

router.get("/my-stores", ownerController.getMyStores);


module.exports = router;
