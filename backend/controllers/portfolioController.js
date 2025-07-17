const Portfolio = require('../models/Portfolio');

// Get portfolio for logged-in user
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or Update portfolio
exports.savePortfolio = async (req, res) => {
  try {
    const existing = await Portfolio.findOne({ user: req.user._id });

    if (existing) {
      const updated = await Portfolio.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true }
      );
      return res.json(updated);
    } else {
      const newPortfolio = new Portfolio({
        user: req.user._id,
        ...req.body
      });
      await newPortfolio.save();
      res.status(201).json(newPortfolio);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
