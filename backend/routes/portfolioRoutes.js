const express = require('express');
const { getPortfolio, savePortfolio } = require('../controllers/portfolioController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getPortfolio);
router.post('/', protect, savePortfolio);

module.exports = router;
