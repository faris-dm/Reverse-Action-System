const express = require("express");
const router = express.Router();
const { z, email } = require("zod");
let userMapStore = new Map();

router.get("/supplier", (req, res) => {
  res.render("supplierRegistor", { message: null });
});

let signUpsupplier = z.object({
  name: z.string().min(3, "userName Must Be at least three characters "),
  email: z.string().email("pleases enter Valid email(@"),
  password: z.string().min(5, "password must be five or more"),
});

// POST /supplier – handle form submission
router.post("/supplier", async (req, res) => {
  // save logic...
  let RegistorSuppleZod = signUpsupplier.safeParse(req.body);
  if (!RegistorSuppleZod) {
    return res.status(400).json({
      err: RegistorSuppleZod.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }

  const { email, password, name, businessName, confirmPassword } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 10);
    let cleanEmail = email.toLowerCase();
    if (!userMapStore.has(cleanEmail)) {
      return res.status(403).send("email aready Found");
    }
    userMapStore.set({
      name: name,
      email: email,
      password: hashPassword,
      businessName: businessName,
    });
    console.log("user supplier added succefully", userMapStore.get(email));
    return res.redirect("/");
  } catch (error) {
    console.log("error happened", error);
    res.redirect("/role");
  }

  res.redirect("/profile/complete?role=supplier");
});

module.exports = router;
