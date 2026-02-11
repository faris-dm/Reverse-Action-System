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
const { token } = require("morgan");
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index.ejs", { message: name });
// });
// app.get("/register", (req, res) => {
//   res.render("register.ejs");
// });

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

// app.post("/register", async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let cleanEmail = email.trim().toLowerCase();
//     if (userMapStore.has(cleanEmail)) {
//       alert("email aready exist");

//       return res.redirect("/register");
//     }

//     let hashedPassword = await bcrypt.hash(password, 10);
//     userMapStore.set(email, {
//       id: Date.now(),
//       name: req.body.name,
//       email: email,
//       password: hashedPassword,
//     });
//     console.log("stored succesfully", userMapStore.get(email));
//     res.redirect("/login");
//   } catch (error) {
//     res.redirect("/register");
//   }
// });

// app.get("/register", (req, res) =>
//   res.render("register.ejs", { message: req.flash("error") })
// );

app.get("/", (req, res) => {
  res.send("welcome to jwt Route in the second server ");
});

let posts = [
  { username: "faris", age: "32" },
  {
    username: "amir",
    age: "22",
  },
];
let refreshStore = [];
app.post("/token", (req, res) => {
  let RefreshTokens = req.body.token;
  if (!RefreshTokens) {
    return res.send("refresh token is missing");
  }
  if (!refreshStore.includes(RefreshTokens)) {
    return res.status(403).send("invalid Tokens");
  }
  jwt.verify(RefreshTokens, RefreshTokenSecret, (err, user) => {
    if (err) return res.status(403).send("error found");
    // let accessTokens=generateAccess({username:user.username})
    let payload = { username: user.username };
    let accessTokens = generateAccess(payload);
    res.json({ accessTokens: accessTokens });
  });
});

// app.get("/post", (req, res) => {
//   // Use console.log to debug what is inside the token!
//   console.log("Logged in user from token:", req.user);
//   let allEmements = Array.from(posts.values());
//   const filteredPosts = allEmements.filter((item) => {
//     return item.username === req.user.username;
//   });

// res.json(filteredPosts);
// });
let frist = Array.from(posts.values());

app.post("/login", (req, res) => {
  let username = req.body.username;
  let user = { username: username };
  let accessTokens = generateAccess(user);
  let RefreshTokens = jwt.sign(user, RefreshTokenSecret, { expiresIn: "7d" });
  refreshStore.push(RefreshTokens);
  console.log("accessTokens:", accessTokens);
  res.json({ accessTokens: accessTokens, RefreshTokens: RefreshTokens });
});

// function tokenAuth(req, res, next) {
//   let authHeader = req.headers["authorization"];
//   let tokens = authHeader && authHeader.split(" ")[1];
//   if (!tokens) {
//     return res.send("Token does not found");
//   }
//   jwt.verify(tokens, secret, (err, user) => {
//     if (err) {
//       res.clearCookie("tokens");
//       return res.redirect("/login");
//     }
//     req.user = user;
//     next();
//   });
// }

app.delete("/logout", (req, res) => {
  refreshStore = refreshStore.filter((token) => token !== req.body.token);
  res.status(204).send("deluted  the token succefully");
});

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

let port = 9700;
app.listen(port, () => {
  console.log(`Server Running on new  https://localhost:${port}`);
});
