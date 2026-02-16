const express = require("express");
const router = express.Router();

router.get("/supplier", (req, res) => {
  res.render("supplierRegistor", { message: null });
});

// POST /supplier – handle form submission
router.post("/supplier", (req, res) => {
  // save logic...

  res.redirect("/profile/complete?role=supplier");
});

module.exports = router;
