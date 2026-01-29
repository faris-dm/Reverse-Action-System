const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
let app = express();
let LocalStrategy = require("passport-local").Strategy;

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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});

let userData = [];

async function authticateUser(email, password, done) {
  let user = userData.find((item) => item.email === email);
  if (!user) {
    return done(null, false, {
      message: " there is noe user  with this email",
    });
  } else {
    try {
      if (await bcrypt.compare(password.userData.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorect Password" });
      }
    } catch (error) {
      return done(error);
    }
  }
}

// new LocalStrategy( { options }, function )
passport.use(new LocalStrategy({ usernameField: email }, authticateUser));

//   after that  we give an ID  to checkk

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  return done(
    null,
    user.find((item) => item.id === id)
  );
});

app.set();

let port = 3000;

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
