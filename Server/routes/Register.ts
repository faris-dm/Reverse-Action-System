import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import Pool from "../config/database"
import { Router } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import NodeMailer from "nodemailer";
import { randomInt, createHash } from "crypto";
const router = Router();
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(express.json());

const secret = process.env.AccessSecret as string;
const refreshSecret = process.env.refreshSecret as string;

const generateAccess = (accessInputs: any): string => {
  return jwt.sign(accessInputs, secret, { expiresIn: "15m" });
};

const geneateRefresh = (refreshInput: any): string => {
  return jwt.sign(refreshInput, refreshSecret, { expiresIn: "7d" });
};

function hastOTp(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

function generateOtp(): string {
  return randomInt(100000, 1000000).toString();
}
// router.post("/signup", async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Fill all fields" });
//     }
//     const normalizedEmail = email.trim().toLowerCase();
//     const selectQuery = await Pool.query(
//       `
//   SELECT *  FROM  users  WHERE  email=$1`,
//       [normalizedEmail]
//     );

//     const Result = selectQuery.rows.length;
//     if (Result > 0) {
//       return res.status(409).json({ message: "email aready exist" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const saveUser = await Pool.query(
//       `
//      INSERT INTO users (username,email, password_hash
// )   VALUES ($1,$2,$3) RETURNING id,username,email
//     `,
//       [username, email, hashPassword]
//     );

//     const finalResult = saveUser.rows[0];

//     const otp = generateOtp();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
//     const otpHashs = hastOTp(otp);

//     const addOTPQuery = await Pool.query(
//       `INSERT INTO  otp_table  (user_id,otp,expires_at)VALUES ($1,$2,$3) `,
//       [finalResult.id, otpHashs, expiresAt]
//     );

//     const sendOtp = NodeMailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.Owner_EMAIL,
//         pass: process.env.Owner_app_password,
//       },
//       tls: {
//         // Skip the certificate check only while developing
//         rejectUnauthorized: process.env.NODE_ENV === "production",
//       },
//     });

//     let emailOTP = await sendOtp.sendMail({
//       from: process.env.Owner_EMAIL,
//       to: finalResult.email,
//       subject: "your email verfication OTP",
//       text: `enter this code ${otp} it will exprese in five minutes`,
//     });

//     console.log(otp);
//     console.log(`otp accepted`, emailOTP.accepted);
//     console.log(`otp accepted`, emailOTP.rejected);
//     console.log(`otp accepted`, emailOTP.response);


//     return res.status(201).json({
//       success: true,
//       message: "registed succefully Check your email",
//       user: finalResult,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });




router.post("/buyer", async (req: Request, res: Response) => {
  try {
    // 1. Get the information submitted by the frontend
    const { username, email, password } = req.body;

    // 2. Validate required fields without Zod
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || !cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (cleanUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    // 3. Check whether the username or email already exists
    const existingUser = await Pool.query(
      `SELECT id, username, email
       FROM users
       WHERE username = $1 OR email = $2
       LIMIT 1`,
      [cleanUsername, cleanEmail]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];

      if (user.email === cleanEmail) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "This username is already taken.",
      });
    }

    // 4. Hash the password before saving it
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Set the role on the backend, not from req.body
    const role = "buyer";

    // 6. Insert the buyer into PostgreSQL
    const result = await Pool.query(
      `INSERT INTO users (username, email, password_hash, role,email_verification)
       VALUES ($1, $2, $3, $4,FALSE)
       RETURNING
         id,
         username,
         email,
         role,
         verification_status,
         account_status,
         created_at`,
      [cleanUsername, cleanEmail, passwordHash, role]
    );

    // 7. Return the created user's public information
    return res.status(201).json({
      success: true,
      message: "Buyer account created successfully.",
      user: result.rows[0],
    });
  } catch (error: unknown) {
    // PostgreSQL unique-constraint violation
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return res.status(409).json({
        success: false,
        message: "Username or email is already registered.",
      });
    }

    console.error("Buyer registration error:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during registration.",
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json("incorrect inputs ");
    }

    console.log(username)
    const selectUserInfo = await Pool.query(
      `
        SELECT * FROM  users WHERE  email=$1  
         `,
      [email]
    );

    if (selectUserInfo.rows.length === 0) {
      return res.status(401).json("incorrect inputs ");
    }

    const full_Info = selectUserInfo.rows[0];
    const comparePassword = await bcrypt.compare(
      password,
      full_Info.password_hash
    );

    if (!comparePassword) {
      return res.status(401).json("incorrect inputs");
    }

    const accessInputs = {
      id: full_Info.id,
      email: full_Info.email,
    };
    const refreshInput = {
      id: full_Info.id,
    };

    const accessToknes = generateAccess(accessInputs);
    const refresh_tokens = geneateRefresh(refreshInput);
    console.log(accessToknes, "accesstokens");
    // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // await Pool.query(
    //   ` INSERT INTO refresh_tokens (user_id,token,done_date) VALUES ($1,$2,$3) `,
    //   [full_Info.id, refresh_tokens, expiresAt]
    // );

    res.cookie("token", accessToknes, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refresh_tokens, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Loin succefully",
      user: {
        id: full_Info.id,
        username: full_Info.username,
        email: full_Info.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("server failed");
  }
});


router.post("/logout", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    // if (refreshToken) {
    //   await Pool.query(`DELETE FROM refresh_tokens WHERE token=$1`, [
    //     refreshToken,
    //   ]);
    // }

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
    };
    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server failed" });
  }
});




router.post("/refreshToken", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, refreshSecret, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }
      const checkTokeDb = await Pool.query(
        `
          SELECT * FROM refresh_tokens WHERE user_id=$1 AND token=$2 `,
        [decoded.id, refreshToken]
      );

      if (checkTokeDb.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "Refresh token not recognized",
        });
      }
      const tokenResult = await Pool.query(
        `
  SELECT id,email from users WHERE id=$1`,
        [decoded.id]
      );

      const finalResult = tokenResult.rows[0];

      const newAccesToken = generateAccess({
        id: finalResult.id,
        email: finalResult.email,
      });

      res.cookie("token", newAccesToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ success: true, message: "Access token refreshed" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("server failed");
  }
});





export default router;