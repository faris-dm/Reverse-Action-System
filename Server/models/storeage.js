// store/userStore.js
// This file will hold the ONE shared Map
const express = require("express");
const userMap = new Map();
const bcrypt = require("bcrypt");
let crypto = require("crypto");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const admin = "admin";
const email = "admin@gmail.com";
const password = "MainAdmin";
console.log("admin email", email, "pasword", password);
// done
async function mainAmin() {
  try {
    let UserId = crypto.randomUUID();
    const cleanEmail = email.toLowerCase().trim();
    const HashBuyerPassword = await bcrypt.hash(password, 10);
    const NewAdmin = {
      id: UserId,
      fullName: admin,
      email: cleanEmail,
      password: HashBuyerPassword,
      role: "admin",
    };

    // done
    userMap.set(cleanEmail, NewAdmin);
    console.log("admin created succefully");
  } catch (error) {
    console.log(error);
    return resizeBy.json("error in Handling the admin Page");
  }
}

// gone
mainAmin();

module.exports = userMap;
