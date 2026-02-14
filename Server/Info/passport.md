##### passport

a flexable auth middleware for node and purpose is to handle auth

### it give a method to authticate users based on some stratagies

#### STARTAGIES OFPASSPORT

this are modules that tell the passport how to authticate the use using the stargries

### passport

    passport  is a middleware  that allow user to use passport strtagies to authticate the login and password and help us to integrate google and facebook signup features

##### passport uniquicity

    it is mach easier to authticate and integrate this  google and facebook signup with passport instead of writing ny our hand/costume authticatetion

    usage  two route one desplaying the route using get and one to authticate and send data from the signup using post

### Importance of passport.authenticate() function

a function used by passport that check the user has an account and logied in before going to the index page

#### Check whather the user is loged in or Not

to check that we check if the req.session.user is set then we used this sesion as a middleware and auth
so it the use is authticated it go to next() function or redirect to login

###### How serializeUser() and deserializeUser() actually works

we gete the email we sent and we get the email id andstore it in req.session.passport to trck things

#### express-session

when you log to the bewsite and login the website forget you after that so we created a session or id to all the user, and if you have the id you can open the door with out telling who you are

#### Passport/Local

Passport is the big manager
and Local is the gard
take email and password and check if it exit in the store and check match up

### Express-Flash

it used for showing error message if the input does not ma match
so to send message

#### passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

we are telling the passport to use our local methods means database to verify the auth

## usernameField: "email" },

## by defalut passport udes username to auth so we say forget the username: and make see the email

### the Activity Flow (The "Wake Up" Moment)

When a POST request hits your /login route:

Passport wakes up and sees the LocalStrategy.

It goes into req.body and pulls out the email (because of the usernameField setting) and the password.

It then calls your authenticateUser function and passes those two values into it as the first two parameters.

It also creates the done callback and hands it to you as the third parameter.

#### passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))

## Localstartgy takes two aregements

1:where to look
2:verify callback so ehat answer

the reason we used the ({
is to map the names in the form and get the needed info
})

### Wristband bage card

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  return done(
    null,
    users.find((item) => item.id === id)
  );
});

when user get in get the check it login done then grap the user,id
deseria==check it get the userid and ,done thenuser.find(item)=>item.id==id

#### Memorey management Baje

when user login sucefull it is called

we get user.id and make it Bajee
when user is login

###

app.use(
session({
secret: "W$q4=25\*8%v-}UV", // Your secret key
resave: false,
saveUninitialized: false,
})
);

## secret: "W$q4=25\*8%v-}UV",

    the sestion save the data in thid form

## 2. resave: false

     do not save the sesstion if there is nothing changed
          it save  profile performace

### saveUninitialized: false

if people does not logined in do not save there cookise

like sesstion :set up a storge
passportIntilize:set up auth passport

## app.use(passport.initialize());

it start or make ready the pasport to accepts requests

## app.use(passport.session())

work to compine the cookies and the passport

#### is authticated

it check whather this user has a sessopn or ot then it check
we authticTE THE USER then we decide to go to next lrvrl or not

    const userExist = userStore.find((user) => user.email === req.body.email);

    if (userExist) {
      return res.redirect("/register", { message: " email aready  found" });
    }

#### the full email and password auth

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

async function authIcateUser(email, password, done) {
const emailUser = userStore.find((item) => item.email === email);
if (emailUser == null) {
return done(null, false, { message: "No User found with this email" });
}
try {
if (await bcrypt.compare(password, emailUser.password)) {
return done(null, emailUser);
} else {
return done(null, false, { message: "incorrect Password" });
}
} catch (error) {
return done(error);
}
}

// function authenticateUser(email,password,done) {
// const emailUser=userMapStore.has(email)
// if()
// }

passport.use(new LocalStrategy({ usernameField: "email" }, authIcateUser));
// middle wares

passport.serializeUser((emailUser, done) => done(null, emailUser.id));
passport.deserializeUser((id, done) => {
return done(
null,
userStore.find((item) => item.id == id)
);
});

app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
session({
secret: "W$q4=25\*8%v-}UV",
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
const userExist = userStore.find((user) => user.email === req.body.email);

    if (userExist) {
      req.flash("error", "email aready Taken");
      return res.redirect("/register");
    }

    let HashPassword = await bcrypt.hash(req.body.password, 10);
    userStore.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: HashPassword,
    });
    console.log(userStore);
    res.redirect("/login");

} catch {
res.redirect("/register");
}
});

#####

app.post("/register",toBack, async (req, res) => {
try {
let { email, password } = req.body;

    if (userMapStore.has(email)) {
      req.flash("error", "User aready have  this email");
      return res.redirect("/register")
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    userMapStore.set(email,{
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
// front func is used to check if the user is loged in before if go to k=/ pages

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
