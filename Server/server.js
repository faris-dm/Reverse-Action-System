import express from "express";

import bcrypt from "bcrypt";
let userStore = new Map();
let app = express();
app.use(express.json());

userStore.set(1, { name: "faris", age: 20 });
userStore.set(2, { name: "Mahamed", age: 20 });
userStore.set(3, {
  username: "admin",
  email: "admin23@gmail.com",
  password: "12345678",
});

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

app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("email and pssword are required");
  }
  if (userStore.has(email) || userStore.has(password)) {
    res.status(409).send("pleases choose another username or password");
  }
  try {
    let hashedPassword = await bcrypt.hash(password);

    let userRole = email === "admin23@gmail.com" ? "admin" : "user";
    let newUser = {
      username: req.body.username,
      role: userRole,
      password: hashedPassword,
      createdAt: new Date(),
    };
    userStore.set(email, newUser);
    return res.status(201).json({
      message: "regsitored succefully",
      role: userRole,
    });
  } catch (error) {
    return res.status(500).json({ error: "intrial error" });
  }
});
let port = 2000;

app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
