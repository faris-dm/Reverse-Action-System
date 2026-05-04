const express = require("express");
const jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
let crypto = require("crypto");

const router = express.Router();
router.use(cookiesparser());
const UserStorage = require("../../models/storeage");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/api/createAuction", async (req, res) => {
  const UserId = crypto.randomUUID();
  const {
    title,
    description,
    category,
    budget,
    quantity,
    location,
    expedet,
    priority,
  } = req.body;

  const auctions = Array.from(UserStorage.values());
  const existingAuction = auctions.find(
    (item) => item.type === "auction" && item.title === title
  );

  if (existingAuction) {
    return res.status(409).json({
      success: false,
      message:
        "An auction with this title already exists. Please use a unique name.",
    });
  }
  console.log("Auction Name:", title, "descrption:", description);
  try {
    const NewAuction = {
      id: UserId,
      type: "auction",
      title: title,
      description: description,
      category: category,
      budget: budget,
      quantity: quantity,
      location: location,
      expedet: expedet,
      priority: priority,
    };
    UserStorage.set(UserId, NewAuction);
    return res.status(201).json({
      success: true,
      message: "Auction created successfully",
      data: NewAuction,
    });
    //  i am here
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/getAuction", (req, res) => {
  const newAuction = Array.from(UserStorage.values());
  const alluction = newAuction.filter((item) => item.type === "auction");
  return res.status(200).json(alluction);
});

// done

module.exports = router;
