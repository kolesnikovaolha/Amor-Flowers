export function centsToDollars(cents) {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}
