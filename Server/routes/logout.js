const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  const token = req.cookies.token; // you can decode it to get the user email
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      const user = userMapStore.get(decoded.email);
      if (user) {
        delete user.refreshToken; // or set to null
        userMapStore.set(decoded.email, user);
      }
    } catch (err) {
      // token might be invalid – ignore
    }
  }

  res.redirect("/role");
});

module.exports = router;
