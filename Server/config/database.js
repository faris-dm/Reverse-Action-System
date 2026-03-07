const { Pool } = require("pg");
const connect = new Pool({
  user: "postgres",
  host: "localhost",
  database: "connect",
  password: "admin",
  port: 5432,
});

connect.connect((error, client, release) => {
  if (error) {
    console.error("connection Failed", error.message);
  } else {
    console.log("connection  succefully");
    release();
  }
});

module.exports = connect;
