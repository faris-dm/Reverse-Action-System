const express = require("express");
const router = express.Router();
const verifyTokens = require("../middleware/tokenVerify");
const UserStorage = require("../models/storeage");

router.get("/", verifyTokens, (req, res) => {
  try {
    console.log("req.user from verifyTokens:", req.user);
    const userEmail = req.user.email;
    console.log(" it is now veifying the the tokens");

    const userFromStorage = UserStorage.get(userEmail);

    if (!userFromStorage) {
      return res.status(404).json({ message: "User not found in the storage" });
    }

    if (userFromStorage.role === "supplier") {
      return res.json({
        success: true,
        id: userFromStorage.id,
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
    } else if (userFromStorage.role === "buyer") {
      return res.json({
        success: true,
        id: userFromStorage.id,
        fullName: userFromStorage.fullName,
        email: userFromStorage.email,
        phone: userFromStorage.phone,
        companyName: userFromStorage.companyName,
        companyType: userFromStorage.companyType,
        position: userFromStorage.position,
        companyAddress: userFromStorage.companyAddress,
        accountPurpose: userFromStorage.accountPurpose,
        role: userFromStorage.role,
        createdAt: userFromStorage.createdAt,
        // small
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
