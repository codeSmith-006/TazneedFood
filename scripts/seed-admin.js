import "dotenv/config"
import mongoose from "mongoose";
import { hashPassword } from "../src/lib/password.js";
import Admin from "../src/models/Admin.js";
import { connectDB } from "../src/lib/mongodb.js";
console.log(process.env.ADMIN_SEED_EMAIL)
const email = process.env.ADMIN_SEED_EMAIL;
const password = process.env.ADMIN_SEED_PASSWORD;

if (!email || !password) {
  console.error("Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD.");
  process.exit(1);
}

await connectDB();

const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
if (existing) {
  console.log("Admin already exists:", existing.email);
  process.exit(0);
}

const passwordHash = await hashPassword(password);
const user = await Admin.create({
  email: email.toLowerCase().trim(),
  passwordHash,
  role: "admin",
});

console.log("Admin created:", user.email);
await mongoose.disconnect();
