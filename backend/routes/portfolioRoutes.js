const express = require("express");
const router = express.Router();
const {
  getPortfolioCoins,
  setPortfolioCoins,
  updatePortfolioCoins,
  deletePortfolioCoins,
} = require("../controllers/portfolioController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(authController.protect, getPortfolioCoins)
  .post(setPortfolioCoins);

router.route("/:id").put(updatePortfolioCoins).delete(
  authController.protect,
  // authController.restrictTo("admin"), //only user with admin role can delete
  deletePortfolioCoins
);

module.exports = router;
