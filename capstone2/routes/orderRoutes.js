const express = require('express');
const orderController = require("../controllers/orderController");
const auth = require('../auth');
const { verify, verifyAdmin } = auth;
const router = express.Router();


router.post('/', verify, orderController.createOrder);

module.exports = router;