export function calculateTotalInCents(unitPriceInCents, quantity, discountPercent = 0) {
  return unitPriceInCents * quantity * (1 - discountPercent / 100);
}

