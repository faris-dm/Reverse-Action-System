// userStore.set(1, { name: "faris", age: 20 });
// userStore.set(2, { name: "Mahamed", age: 20 });
// userStore.set(3, {
//   username: "admin",
//   email: "admin23@gmail.com",
//   password: "12345678",
// });

// console.log(userStore.get(1));
// let id = 1;
// app.post("/product", (req, res) => {
//   let NewProduct = { id, name: req.body.name, age: req.body.age };
//   userStore.set(id, NewProduct);
//   id++;
//   res.send(NewProduct);
// });

// app.get("/product", (req, res) => {
//   res, send(Array.from(userStore.values()));
//   console.log("done sccefully");
// });

// app.post("/signup", async (req, res) => {
//   let { username, email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).send("email and pssword are required");
//   }
//   if (userStore.has(email) || userStore.has(password)) {
//     res.status(409).send("pleases choose another username or password");
//   }
//   try {
//     let hashedPassword = await bcrypt.hash(password);

//     let userRole = email === "admin23@gmail.com" ? "admin" : "user";
//     let newUser = {
//       username: req.body.username,
//       role: userRole,
//       password: hashedPassword,
//       createdAt: new Date(),
//     };
//     userStore.set(email, newUser);
//     return res.status(201).json({
//       message: "regsitored succefully",
//       role: userRole,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "intrial error" });
//   }
// });
// const jet = require("jsonwebtoken");

// let data = [
//   { username: "solo", title: "post" },
//   { username: "admin", title: "read me" },
// ];
// app.get("/post", authication, (req, res) => {
//   res.json(data.filter((item) => item.username === req.user.username));
// });

// app.post("/login", (req, res) => {
//   let username = req.body.username;
//   let user = { name: username };
//   let accessToken = jet.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });

//function authication(req, res, next) {
// header--Bearerlet
//   let authHeader = req.headers["authorization"];
//   let token = authHeader && authHeader.split("")[1];
//   if (token == null) return res.send("unmatch tokens");
//   jet.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.send("error hapend");
//     req.user = user;
//     next();
//   });
// }

// 1. DEPENDENCIES & REQUIREMENTS
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

// 2. DATA SOURCE (Must be declared before Passport uses it)
const users = [];

// 3. PASSPORT LOGIC (The "Internal" Strategy)
async function authenticateUser(email, password, done) {
  // Logic: Find the user in our array
  const user = users.find((item) => item.email === email);

  if (user == null) {
    return done(null, false, { message: "No user found with this email" });
  }

  try {
    // Logic: Compare the keys (passwords)
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect Password" });
    }
  } catch (error) {
    return done(error);
  }
}

//  use the email as the  main id  to verify
// 4. PASSPORT CONFIGURATION
passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  return done(
    null,
    users.find((item) => item.id === id)
  );
});

// 5. MIDDLEWARE STACK (Order is vital here!)
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "W$q4=25*8%v-}UV", // Your secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Passport must come AFTER session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // Pass 'message' here so index.ejs doesn't crash
  res.render("index.ejs", { message: req.user.name });
});

app.get("/login", (req, res) =>
  res.render("login.ejs", { message: req.flash("error") })
);

app.get("/register", (req, res) =>
  res.render("register.ejs", { message: req.flash("error") })
);

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, // Set to true to use the messages from authenticateUser
  })
);

// 7. SERVER START
const PORT = 2000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
