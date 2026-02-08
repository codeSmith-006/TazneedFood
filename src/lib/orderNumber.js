import Order from "@/models/Order";

const ORDER_NUMBER_LENGTH = 8;
const MAX_ATTEMPTS = 8;

const generateDigits = () => {
  let value = "";
  for (let i = 0; i < ORDER_NUMBER_LENGTH; i += 1) {
    value += Math.floor(Math.random() * 10);
  }
  return value;
};

export async function generateUniqueOrderNumber() {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidate = generateDigits();
    // Ensure uniqueness at DB level; retry if collision
    const exists = await Order.exists({ orderNumber: candidate });
    if (!exists) return candidate;
  }
  throw new Error("Failed to generate unique order number");
}
