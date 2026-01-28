const express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.json());
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

let port = 3000;

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
