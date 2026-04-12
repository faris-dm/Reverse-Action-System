const express = require("express");
const router = express.Router();
const verifyTokens = require("../middleware/tokenVerify");
const UserStorage = require("../models/storeage");

router.get("/", verifyTokens, (req, res) => {
  console.log("=== /api/me called ===");

  console.log("Cookies received:", req.cookies);

  try {
    console.log("req.user from verifyTokens:", req.user);
    const userEmail = req.user.email;
    console.log("Looking for email:", userEmail);

    const userFromStorage = UserStorage.get(userEmail);
    console.log("User found in storage:", userFromStorage ? "YES" : "NO");

    if (!userFromStorage) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      id: user.id,
      fullName: userFromStorage.fullName,
      email: userFromStorage.email,
      businessName: userFromStorage.businessName,
      businessType: userFromStorage.businessType,
      role: userFromStorage.role,
      phone: userFromStorage.phone || "",
      address: userFromStorage.address || "",
      taxId: userFromStorage.taxId || "",
      regNumber: userFromStorage.regNumber || "",
      yearsInBusiness: userFromStorage.yearsInBusiness || "",
      categories: userFromStorage.categories || [],
      bio: userFromStorage.bio || "",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
