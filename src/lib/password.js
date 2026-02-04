import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// Pre-generated bcrypt hash for timing-attack protection
const DUMMY_HASH =
  "$2b$12$CwTycUXWue0Thq9StjUM0uJ8y7jv1p7r1nq5n7vP2S2rZtGJ1e";

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  // Always run bcrypt to avoid timing attacks
  return bcrypt.compare(password, hash || DUMMY_HASH);
}
