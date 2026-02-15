// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { secret, refreshSecret } = require("../config/auth");
// const userStore = require("../data/userStore");
// const refreshStore = require("../data/refreshStore");
// const { signUp } = require("../models/userValidation");

// const generateAccess = (user) => {
//   return jwt.sign(user, secret, { expiresIn: "15m" });
// };

// exports.getRegister = (req, res) => {
//   res.render("register.ejs");
// };

// exports.postRegister = async (req, res) => {
//   // your registration logic here

//   let resultZod = signUp.safeParse(req.body);
//   if (!resultZod.success) {
//     return res.status(400).json({
//       err: resultZod.error.errors.map((errors) => ({
//         field: errors.path[0],
//         message: errors.message,
//       })),
//     });
//   }

//   const { email, password, name } = resultZod.data;
//   try {
//     let hashPassword = await bcrypt.hash(password, 10);

//     if (userStore.findByEmail(email)) {
//       return res.send("Email already registered");
//     }
//     userStore.create({
//       id: Date.now().toString(),
//       name: name,
//       email: email,
//       password: hashPassword,
//     });
//     console.log("user added succefully", userStore.findByEmail(email));
//     res.redirect("/login");
//   } catch (error) {
//     console.log("error happened", error);
//     res.redirect("register");
//   }
// };

// exports.getLogin = (req, res) => {
//   res.render("login.ejs");
// };

// exports.postLogin = async (req, res) => {
//   // your login logic here
//   let { email, password } = req.body;
//   let cleanEmail = email.toLowerCase();
//   let foundUser = userStore.findByEmail(cleanEmail);
//   if (!foundUser) {
//     return res.send("No email found with this email");
//   }

//   try {
//     if (await bcrypt.compare(password, foundUser.password)) {
//       let user = { email: email, name: foundUser.name };

//       let accessTokens = generateAccess(user);

//       let RefreshTokens = jwt.sign(user, refreshSecret, {
//         expiresIn: "7d",
//       });

//       refreshStore.push(RefreshTokens);
//       console.log("login success");
//       console.log(
//         "accessTokens:\n",
//         accessTokens,
//         "\n RefreshTokens:\n",
//         RefreshTokens
//       );
//       res.cookie("token", accessTokens, { httpOnly: true });

//       // return res.redirect("/");
//       return res.json({
//         accessTokens: accessTokens,
//         RefreshTokens: RefreshTokens,
//       });
//     } else console.log("incorrect password");
//     return res.json("incorrect Password");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.refreshToken = (req, res) => {
//   // your refresh logic here

//   let authHeaderToken = req.body.token;
//   if (!authHeaderToken) {
//     return res.status(401).send("No refresh Token found");
//   } else if (!refreshStore.includes(authHeaderToken)) {
//     return res.status(401).send("Token does not match");
//   }
//   jwt.verify(authHeaderToken, refreshSecret, (err, user) => {
//     if (err) return res.status(403).send("Error happend Pleases check again");
//     let playload = {
//       email: user.email,
//       name: user.name,
//     };
//     let accessTokens = generateAccess(playload);
//     res.json({ accessTokens: accessTokens });
//   });
// };
