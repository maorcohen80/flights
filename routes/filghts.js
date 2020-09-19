const express = require('express');

const router = express.Router();

const flightsController = require('../controllers/flights')

//GET /flights/

router.get('/flights', flightsController.getFlights);

module.exports = router;



