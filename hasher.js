//1. A fő könyvtárba egy npm i bcrypt
//2. A konzolba node hasher.js

const bcrypt = require("bcrypt");

const rawPassword = "test123";
const saltRounds = 10;

bcrypt.hash(rawPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log("Hashelt jelszó:", hash);
});
