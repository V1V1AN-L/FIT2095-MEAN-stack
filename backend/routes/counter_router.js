const express = require('express');
const router = express.Router();
const Counter = require("../models/counter");
const CounterController = require("../controllers/counter-controller");

router.get('/zecan/api/v1/counter', CounterController.getCUDStats);

module.exports = router;