const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let cookiesparser = require("cookie-parser");
app.use(cookiesparser());
let flash = require("express-flash");
// let userMapStore = new Map();
const bcrypt = require("bcrypt");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's address
    credentials: true, // Allow cookies/credentials
  })
);
const mysql = require("mysql2");
app.use(express.json());

const { use } = require("passport");
app.use(express.urlencoded({ extended: true }));
const userMapStore = require("./models/storeage");

const { z } = require("zod");
// import supplier Regidtor

const SupplierRegidtor = require("./routes/supplierRegistor");
app.use(SupplierRegidtor);

// import buyerRegistor
const BuyerRegistor = require("./routes/BuyerRegistor");
app.use(BuyerRegistor);

const supplierRoutes = require("./routes/supplier");
app.use(supplierRoutes);
const buyerRoute = require("./routes/buyer");
app.use(buyerRoute);
const login = require("./routes/login");
app.use(login);
const tokenRoute = require("./routes/token");
app.use(tokenRoute);
const daConnect = require("./config/database");

const Dashboard = require("./routes/Dashboard");
app.use(Dashboard);
const Logout = require("./routes/logout");
app.use(Logout);
const MeRoute = require("./controllers/me");
const verifyTokens = require("./middleware/tokenVerify");

app.use("/api/me", verifyTokens, MeRoute);

app.use((req, res, next) => {
  req.db = daConnect;
  next();
});

// check the route
// ADD THESE LINES
app.get("/api/auth/status", verifyTokens, (req, res) => {
  res.status(200).json({ loggedIn: true });
});

let signUp = z.object({
  name: z.string().min(3, "userName Must Be at least three characters "),
  email: z.string().email("Please Inser Valid @ email"),
  password: z.string().min(5, "password must be five or more"),
});

app.post("/register", async (req, res) => {
  let resultZod = signUp.safeParse(req.body);
  if (!resultZod.success) {
    return res.status(400).json({
      err: resultZod.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }

  const { email, password, name } = resultZod.data;
  try {
    let hashPassword = await bcrypt.hash(password, 10);

    if (userMapStore.has(email)) {
      return res.send("email aready  found  with this emil");
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

app.get("/test", (req, res) => {
  console.log("🔵 TEST ROUTE WAS ACCESSED!");
  res.send("If you see this, the server is working!");
});

let port = 21000;
app.listen(port, () => {
  console.log(`Server Running on new  http://localhost:${port}`);
});
