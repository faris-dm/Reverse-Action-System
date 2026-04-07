const express = require("express");
const { route } = require("./supplierRegistor");
const router = express.Router();

router.post("/api/BuyerRegistor", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    companyName,
    companyType,
    industrySector,
    position,
    companyAddress,
    accountPurpose,
    termsAccepted
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword ||
    !companyName ||
    !companyType ||
    !industrySector ||
    !position ||
    !companyAddress ||
    !accountPurpose
  )
    return res.status(400).json({ message: "Please fill all required fields" });

  // password confiramation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Log all data to console
    console.log("=================================");
    console.log("Buyer Registration:");
    console.log("Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("position:", position);
    console.log("=================================");

    // Send success response
    res.status(200).json({
      message: "Registration successful!",
      redirect: "/buyer",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
