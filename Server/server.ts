// import express from "express"
import express from "express";
import cors from "cors";
import Pool from "./config/database.js"

import cookieParser from "cookie-parser";
import Register from "./Register"

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());
app.use("/",Register)

Pool.query("SELECT NOW()")
  .then((e) => console.log("db connected", e.rows[0]))
  .catch((d) => console.log("db failed", d.message));

let port = 4000;

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
