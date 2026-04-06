const express = require("express");
const router = express.Router();

// Supplier registration route
router.post("/api/supplierRegistor", async (req, res) => {
  // Get data from React form
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    businessName,
    businessType,
    agreementsAccepted,
  } = req.body;

  // Simple validation
  if (!fullName || !email || !password || !businessName) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Log all data to console
    console.log("=================================");
    console.log("Supplier Registration:");
    console.log("Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Business:", businessName);
    console.log("=================================");

    // Send success response
    res.status(200).json({
      message: "Registration successful!",
      redirect: "/Dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
