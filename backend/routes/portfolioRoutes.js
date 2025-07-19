import express from 'express';
import { createPortfolio, getPortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

router.post('/create', createPortfolio);
router.get('/:userId', getPortfolio);

export default router;
