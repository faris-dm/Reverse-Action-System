const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let port = 7800;

app.post("/", (req, res) => {
  const data = {
    name: "solo Naser",
    age: "32",
    job: "software dev  who  not scrifiess anythings",
    hobbies: "Connecting with people",
  };

  res.send(data);
});

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
