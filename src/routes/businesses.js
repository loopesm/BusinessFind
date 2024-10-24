const express = require('express');
const { findBusinesses } = require('../controllers/businessController');

const router = express.Router();

router.get('/api/businesses', findBusinesses);

module.exports = router;
