const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let port = 7800;
app.use(express.json());
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  const data = {
    name: "solo Naser",
    age: "32",
    job: "software dev  who  not scrifiess anythings",
    hobbies: "Connecting with people",
  };
  res.send(data);
});

const payload = { sub: "12345", role: "user" };
// payload:data/sub:subhect
let secret = "W$q4=25*8%v-}UV";
const token = jwt.sign(payload, secret, {
  expiresIn: "14m",
  //   sign marget the two to create a  token
});

console.log("accses Token is ", token);

// app.post("/login", (req, res) => {
//   let username = req.body.name;
//   const user = { name: username };
//   const userToken = jwt.sign(user, secret);
//   res.json({ userToken: userToken });
// });

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
