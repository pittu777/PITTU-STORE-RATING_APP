const bcrypt = require("bcryptjs");

async function generateHash() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  console.log("Hashed Password:", hashedPassword);
}

generateHash();
