const express = require("express");
const router = express.Router();
const storgeUse = require("../models/storeage");

router.delete("/logout", (req, res) => {
  refreshStore = refreshStore.filter((token) => token !== req.body.token);
  res.status(204).send("deleted  the token succefully");
  return res.redirect("/role");
});

module.exports = router;
