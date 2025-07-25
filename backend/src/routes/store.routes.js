
const express = require('express');
const router = express.Router();
const storeController = require('./../controllers/store.controller');
const authenticateUser = require('../middleware/auth.middleware');


router.get('/', authenticateUser, storeController.getAllStores);
router.get("/my-store", authenticateUser, storeController.getMyStore);
module.exports = router;
