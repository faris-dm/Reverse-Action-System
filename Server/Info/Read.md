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

// use the email as the main id to verify
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
secret: "W$q4=25\*8%v-}UV", // Your secret key
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

#### Rules that are seem when some one logic in backend

single response :server only send one res.redirect
id:there is no idticicATION NUMBER and it is needed to retrive it later




####  Axios
  when data is communicating with frontend and backend there should be a way to communicate so  use fetch to recive info from the backend  and the more simple way is axios
  axios:convert the data that is send in to data without writing
   the old fetch
    const response=awit fetch("localjost:21000),{includes{:truw}}
    methods:"post.....

    but in axioss like
    const response =axios.post("localhost:21000)
also this axios manage all the reponese like 401 and all the pages within

### REduix   and Props Roeling
REduix is used to manage the  data or componts sharing between  componts  that make it complex

### Reduix --Centralize 
 manly it is used  to fix the props complicity of multiple componts at once
 . we move everythigs inyo global store


### Context APi
  is created to pass data between componts without the need of props


 
