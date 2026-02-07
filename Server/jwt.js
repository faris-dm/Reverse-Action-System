const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let cookiesparser = require("cookie-parser");
app.use(cookiesparser());
let flash = require("express-flash");
let userMapStore = new Map();
const bcrypt = require("bcrypt");
const { name } = require("ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(flash());
let port = 7800;

//  creating the tokena
let payloadInfo = { sub: "12345", role: "user" };
let secret = "W$q4=25*8%v-}UV";
jwt.sign(payloadInfo, secret, { expiresIn: "15m" });

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
// let post = [
//   {
//     username: "solo",
//     email: "solonaser9@gmail.com",
//     password: "12345",
//   },
//   {
//     username: "amir",
//     email: "aolonaser9@gmail.com",
//     password: "012345",
//   },
// ];

function authTokens(req, res, next) {
  // let authHeader = req.headers["authorization"];
  // if we have authheader  then split it else undefined
  let token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.cleanCookie("token");
      return res.redirect("/login");
    }

    req.user = user;
    next();
  });
}

// app.get("/post", authTokens, (req, res) => {
//   console.log("Logged in user from token", req.user);
//   res.json([post.filter((post) => post.username === req.user.username)]);
// });

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.redirect("/login");
  let cleanEmail = email.trim().toLowerCase();
  try {
    let FoundEsmail = userMapStore.get(cleanEmail);
    if (!FoundEsmail) {
      console.log("user  does not found");
      return res.redirect("/login");
    } else {
      let comaprePassword = await bcrypt.compare(
        password,
        FoundEsmail.password
      );
      if (!comaprePassword) {
        console.log("Wrong password");
        return res.redirect("/login");
      } else {
        console.log("found the legit user");

        // let payload = {
        //   id: FoundEsmail.id,
        //   name: FoundEsmail.name,
        // };
        let user = { name: FoundEsmail.name, email: FoundEsmail.email };

        let accesTokens = jwt.sign(user, secret);
        // res.json({ accesTokens: accesTokens });
        console.log("accesstokens:", accesTokens);
        res.cookie("tokens", accesTokens, { httpOnly: true });
        return res.redirect("/");
      }
    }
  } catch (error) {
    console.log("error happend", error);

    return res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", { message: name });
});
app.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;
    let cleanEmail = email.trim().toLowerCase();
    if (userMapStore.has(cleanEmail)) {
      alert("email aready exist");

      return res.redirect("/register");
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    userMapStore.set(email, {
      id: Date.now(),
      name: req.body.name,
      email: email,
      password: hashedPassword,
    });
    console.log("stored succesfully", userMapStore.get(email));
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
});

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
