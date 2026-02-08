export async function notifyAdminOrderPlaced({
  orderNumber,
  customerName,
  phone,
  total,
  paymentMethod,
}) {
  console.log(
    `[ADMIN NOTIFY] New order ${orderNumber} | ${customerName} | ${phone} | Total ৳${total} | ${paymentMethod}`,
  );
}

export async function notifyCustomerOrderPlaced({
  orderNumber,
  total,
  phone,
  supportContact,
}) {
  console.log(
    `[CUSTOMER NOTIFY] Order ${orderNumber} placed. Total ৳${total}. We will confirm delivery soon. Support: ${supportContact}. Phone: ${phone}`,
  );
}
