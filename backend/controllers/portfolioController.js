const asyncHandler = require("express-async-handler");

const PortfolioCoins = require("../models/portfolioCoinsModel");
// const User = require("../models/userModel");

// @desc    Get PortfolioCoins
// @route   GET /api/PortfolioCoins
// @access  Private
const getPortfolioCoins = asyncHandler(async (req, res) => {
  const PortfolioCoinss = await PortfolioCoins.find();

  res.status(200).json(PortfolioCoinss);
});

// @desc    Set PortfolioCoins
// @route   POST /api/PortfolioCoins
// @access  Private
const setPortfolioCoins = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // const coin = await PortfolioCoins.create({
  //   coin: req.body.text,

  const newCoin = await PortfolioCoins.create(req.body);
  // user: req.user.id,
  // });

  res.status(200).json(newCoin);
});

// @desc    Update PortfolioCoins
// @route   PUT /api/PortfolioCoinss/:id
// @access  Private
const updatePortfolioCoins = asyncHandler(async (req, res) => {
  const coin = await PortfolioCoins.findById(req.params.id);

  if (!coin) {
    res.status(400);
    throw new Error("PortfolioCoin not found");
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  // Make sure the logged in user matches the PortfolioCoins user
  // if (PortfolioCoins.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  const updatedCoin = await PortfolioCoins.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCoin);
});

// @desc    Delete PortfolioCoins
// @route   DELETE /api/PortfolioCoinss/:id
// @access  Private
const deletePortfolioCoins = asyncHandler(async (req, res) => {
  const coin = await PortfolioCoins.findByIdAndDelete(req.params.id);

  if (!coin) {
    res.status(400);
    throw new Error("PortfolioCoins not found");
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  // Make sure the logged in user matches the PortfolioCoins user
  // if (PortfolioCoins.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPortfolioCoins,
  setPortfolioCoins,
  updatePortfolioCoins,
  deletePortfolioCoins,
};
