// require("dotenv").config();
const express = require("express");

const bcrypt = require("bcrypt");
let userStore = new Map();
let app = express();
app.use(express.json());

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

app.set("view engine", "ejs");
// app.use(express.static(pub));

app.get("/home", (req, res) => {
  res.status(200).render("index.ejs", { message: "solo" });
  console.log("gone succefully");
});

app.get("/", (req, res) => {
  res.status(200).render("register.ejs");
});

app.get("/login", (req, res) => {
  res.status(200).render("login.ejs");
});

let port = 2000;

app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
