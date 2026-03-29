const { Client, Pool } = require("pg");

const pools = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "Auction",
});
// pools.connect();
(async () => {
  let client;
  try {
    client = await pools.connect(); // await the connection
    console.log("Connected successfully");
    // Optionally run a test query:
    // const res = await client.query('SELECT NOW()');
    // console.log(res.rows[0]);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    if (client) client.release(); // release client back to pool
  }
})();
