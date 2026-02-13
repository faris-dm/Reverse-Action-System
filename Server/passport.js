("cookie-parser");
app.use(cookiesparser());
let flash = require("express-flash");
let userMapStore = new Map();
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const { populate } = require("dotenv");
const { token } = require("morgan");
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

app.get("/", (req, res) => {
  res.send("welcome to jwt Route in the second server ");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 10);

    if (userMapStore.has(email)) {
      res.send("email aready  found  with this emil");
    }
    userMapStore.set(email, {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: hashPassword,
    });
    console.log("user added succefully", userMapStore.get(email));
    res.redirect("/login");
  } catch (error) {
    console.log("error happened", error);
    res.redirect("register");
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let cleanEmail = email.trim().toLowerCase()();
  if (!userMapStore.get(cleanEmail)) {
    res.send("No email found  with this email");
  }

  try {
    if (await bcrypt.compare(password, userMapStore.get(password))) {
      let user = { email: userMapStore.email, password: userMapStore.password };

      res.redirect("/");
    } else console.log("incorrect password");
    res.send("incorrect password thik again");
  } catch (error) {
    console.log(error);
  }
});

let port = 2000;
app.listen(port, () => {
  console.log(`Server Running on new  https://localhost:${port}`);
});
