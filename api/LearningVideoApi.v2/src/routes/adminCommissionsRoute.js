const express = require("express");
const router = express.Router();
const adminCommissionController = require("../controllers/adminCommissionController");
const {
  authMiddleware,
} = require("../middlewares/authMiddleware");

router.get(
  "/commission",
  authMiddleware,
  adminCommissionController.getCommissions
);

module.exports = router;
