import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, parseInt(process.env.SALT_ROUNDS));
  return hash
}

async function comparePassword(pass, hash) {
  const res = await bcrypt.compare(pass, hash);
  return res;
}

export default hashPassword;
export {comparePassword};  
