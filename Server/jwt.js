const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

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

function authTokens(req, res, next) {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split("")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token missing" });
    }

    req.user = decoded;
    next();
  });
}

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

        let payload = {
          id: FoundEsmail.id,
          name: FoundEsmail.name,
        };
        let accesTokens = jwt.sign(payload, secret);
        // res.json({ accesTokens: accesTokens });
        console.log("accesstokens:", accesTokens);

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
