// routes/enquiryRoutes.js
const express = require("express");
const router = express.Router();

const {
  submitPublicEnquiry,
  getUnclaimedLeads,
  getClaimedLeads,
  claimLead,
} = require("../controllers/enquiryController");

const authMiddleware = require("../middleware/authMiddleware");

// 🟢 Public route (no JWT)
router.post("/public", submitPublicEnquiry);

// 🔒 Protected routes (JWT required)
router.get("/public", getUnclaimedLeads);
router.get("/private", authMiddleware, getClaimedLeads);
router.patch("/:id/claim", authMiddleware, claimLead);

module.exports = router;
