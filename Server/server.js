import express from "express";

let app = express();
app.get("/", (req, res) => {
  res.status(200).send("Wellcome tosoloZIddir");
});

let port = 2000;

app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
