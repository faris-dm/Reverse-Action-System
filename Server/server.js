// const { name } = require("ejs");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
let app = express();
let userStore = [];
let LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { name } = require("ejs");
let userMapStore = new Map();
app.use(express.static("public"));

async function authenticateUser(email, password, done) {
  let cleanEmail = email.trim().toLowerCase();
  const emailUser = userMapStore.get(cleanEmail);
  if (!emailUser) {
    return done(null, false, { message: "No User found with this email" });
  }
  try {
    if (await bcrypt.compare(password, emailUser.password)) {
      return done(null, emailUser);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    return done(error);
  }
}

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
// middle  wares

passport.serializeUser((emailUser, done) => done(null, emailUser.id));

passport.deserializeUser((id, done) => {
  let arr = Array.from(userMapStore.values());
  let user = arr.find((items) => items.id === id);
  return done(null, user);
});

app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "W$q4=25*8%v-}UV",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/register", toBack, (req, res) =>
  res.render("register.ejs", { message: req.flash("error") })
);

app.get("/login", toBack, (req, res) => {
  return res.render("login.ejs", { message: req.flash("error") });
});

app.get("/", toFront, (req, res) => {
  if (req.isAuthenticated()) {
    // Accessing req.user is only safe inside this block
    res.render("index.ejs", { message: req.user.name });
  } else {
    // If not logged in, send them away before the crash happens
    res.redirect("/login");
  }
});

app.post("/register", toBack, async (req, res) => {
  try {
    let { email, password } = req.body;

    if (userMapStore.has(email)) {
      req.flash("error", "User aready have  this email");
      return res.redirect("/register");
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    userMapStore.set(email, {
      id: Date.now(),
      name: req.body.name,
      email: email,
      password: hashedPassword,
    });

    console.log("succefully added", userMapStore.get(email));
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.post(
  "/login",
  toBack,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
//  front func is used to check if the user is loged in  before if go to k=/ pages

function toFront(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// to aback is used to make not to go back after you logied in with out the logout

function toBack(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return next();
}

app.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    console.log("lougouted the data", userStore);

    res.redirect("/login");
  });
});

let port = 4000;

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
