// // const { connect } = require("../routes/supplier");
// const Client = require("./database");
// const creeateTableSupply = `CREATE TABLE IF NOT EXISTS users (

// id SERIAL PRIMARY KEY,
// email VARCHAR(255) UNIQUE NOT NULL,
// name VARCHAR(100) NOT NULL,
// password_hash VARCHAR(255)  NOT NULL,
//   role VARCHAR(50) NOT NULL CHECK (role IN ('supplier', 'buyer', 'admin')),
//     business_name VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     last_login TIMESTAMP,
//     is_active BOOLEAN DEFAULT true,
//     refresh_token TEXT,
//     email_verified BOOLEAN DEFAULT false

//  )`;

// async function funcTable() {
//   try {
//     await Client.query(creeateTableSupply);
//     console.log("created succefully");
//   } catch (error) {
//     console.error("❌ Error creating table:", error);
//   } finally {
//     await Client.end();
//   }
// }

// module.exports = { funcTable };
