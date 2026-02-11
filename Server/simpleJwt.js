const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let cookiesparser = require("cookie-parser");
app.use(cookiesparser());
let flash = require("express-flash");
let userMapStore = new Map();
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const { populate } = require("dotenv");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to jwt Route");
});

let posts = [
  { username: "faris", age: "32" },
  {
    username: "amir",
    age: "22",
  },
  {
    username: "mame",
    age: "42",
  },
  {
    username: "fuu",
    age: "55",
  },
];

app.get("/post", tokenAuth, (req, res) => {
  // Use console.log to debug what is inside the token!
  console.log("Logged in user from token:", req.user);
  let allEmements = Array.from(posts.values());
  const filteredPosts = allEmements.filter((item) => {
    return item.username === req.user.username;
  });

  res.json(filteredPosts);
});
// let frist = Array.from(posts.values());

// app.post("/login", (req, res) => {
//   let username = req.body.username;
//   let user = { username: username };
//   let accessTokens = jwt.sign(user, secret);

//   console.log("accessTokens:", accessTokens);
//   res.json(accessTokens);
// });

function tokenAuth(req, res, next) {
  let authHeader = req.headers["authorization"];
  let tokens = authHeader && authHeader.split(" ")[1];
  if (!tokens) {
    return res.send("Token does not found");
  }
  jwt.verify(tokens, secret, (err, user) => {
    if (err) {
      res.clearCookie("tokens");
      return res.status(403).json({ message: "Token expired or invalid" });
    }
    req.user = user;
    next();
  });
}

let port = 9600;
app.listen(port, () => {
  console.log(`Server Running old on https://localhost:${port}`);
});
