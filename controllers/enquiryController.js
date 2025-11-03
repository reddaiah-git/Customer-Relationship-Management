// controllers/enquiryController.js
const Enquiry = require("../models/enquiry");

// 1️⃣ Public Enquiry Submission (No Auth)
exports.submitPublicEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      claimed: false,
      counselorId: null,
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (err) {
    console.error("Error submitting enquiry:", err);
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};

// 2️⃣ Fetch Unclaimed Leads (Public)
exports.getUnclaimedLeads = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: {
        claimed: false,
        counselorId: null,
      },
    });

    res.status(200).json({ enquiries });
  } catch (error) {
    console.error("Error fetching unclaimed leads:", error);
    res.status(500).json({ message: "Failed to fetch unclaimed leads" });
  }
};

// 3️⃣ Fetch Claimed Leads (Private)
exports.getClaimedLeads = async (req, res) => {
  try {
    const counselorId = req.user; // populated by JWT middleware

    const enquiries = await Enquiry.findAll({
      where: { counselorId },
    });

    res.status(200).json({ enquiries });
  } catch (error) {
    console.error("Error fetching claimed leads:", error);
    res.status(500).json({ message: "Failed to fetch claimed leads" });
  }
};

// 4️⃣ Claim Lead
exports.claimLead = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const counselorId = req.user;

    const enquiry = await Enquiry.findByPk(enquiryId);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

    // Prevent duplicate claims
    if (enquiry.claimed || enquiry.counselorId) {
      return res.status(409).json({ message: "Enquiry already claimed" });
    }

    enquiry.claimed = true;
    enquiry.counselorId = counselorId;
    await enquiry.save();

    res.status(200).json({
      message: "Lead claimed successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error claiming lead:", error);
    res.status(500).json({ message: "Failed to claim lead" });
  }
};
