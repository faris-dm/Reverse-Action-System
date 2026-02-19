// middleware/auth.js
const jwt = require("jsonwebtoken");

// Use the same secret as in your login route
const secret = "W$q4=25*8%v-}UV"; // Ideally move this to a config file

const authenticateToken = (req, res, next) => {
  // Get token from cookie (set during login/registration)
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, secret);
    // Attach the decoded user info to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
