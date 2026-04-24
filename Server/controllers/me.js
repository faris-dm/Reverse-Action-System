const express = require("express");
const router = express.Router();
const verifyTokens = require("../middleware/tokenVerify");
const UserStorage = require("../models/storeage"); // Double check this spelling!

router.get("/", verifyTokens, (req, res) => {
  try {
    // 1. Safety check for the token data
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token data" });
    }

    const userEmail = req.user.email.toLowerCase().trim();
    const user = UserStorage.get(userEmail);

    // 2. User existence check
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 3. Structured Role Response
    const baseData = {
      success: true,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    if (user.role === "supplier") {
      return res.json({
        ...baseData,
        businessName: user.businessName,
        businessType: user.businessType,
        phone: user.phone || "",
        address: user.address || "",
        categories: user.categories || [],
        bio: user.bio || "",
      });
    }

    if (user.role === "buyer") {
      return res.json({
        ...baseData,
        phone: user.phone,
        companyName: user.companyName,
        position: user.position,
        companyAddress: user.companyAddress,
      });
    }

    // done hgf
    // 4. Handle Admin or undefined roles
    return res.json({
      ...baseData,
      message: "Basic profile data retrieved",
    });
  } catch (error) {
    console.error("Auth Route Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
