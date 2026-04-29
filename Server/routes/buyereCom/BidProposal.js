
const express = require("express");
const cookiesparser = require("cookie-parser");
const crypto = require("crypto");
const UserStorage = require("../../models/storeage");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express();
router.use(express.json());
router.use(cookiesparser);
router.use(express.urlencoded({ extended: true }));
const uploadDir = path.join(__dirname, "../../uploads");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// add multer to recive some files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/recivePropoal", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { fullName, price, description, deadline } = req.body;
  console.log("file name :", req.file.originalname);
  const file = req.file;
  const UserId = crypto.randomUUID();
  const ProposalAuction = Array.from(UserStorage.values());

  const existProposal = ProposalAuction.find(
    (item) => item.type === "proposal" && item.description === description
  );
  if (existProposal) {
    return res.status(409).json({
      success: false,
      message: "Proposal aready Esits",
    });
  }
  console.log("proposal Name:", description);
  try {
    const NewPropoal = {
      id: UserId,
      type: "proposal",
      fullName: fullName,
      price: price,
      deadline: deadline,
      description: description,
      fileUrl: req.file.path,
    };

    UserStorage.set(UserId, NewPropoal);
    return res.status(201).json({
      success: true,
      message: "Propoal sent succefully",
      data: NewPropoal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/getProposal", (req, res) => {
  const proposal = Array.from(UserStorage.values());
  const allProposals = proposal.filter((item) => item.type === "proposal");
  return res.status(200).json(allProposals);
});

module.exports = router;
