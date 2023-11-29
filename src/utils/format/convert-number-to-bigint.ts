/**
 * Converts a price represented as a number to BigInt
 *
 * @param price
 * @param decimals
 */
export const convertNumberToBigInt = (price: number, decimals: number): bigint => {
  // const priceOrZero = Number.isNaN(price) ? 0 : price; // in case the number is NaN, return 0 to prevent a runtime error
  // const bigPrice = BigInt(priceOrZero.toString());
  // const multiplier = BigInt(10) ** BigInt(decimals);
  // const result = bigPrice * multiplier;
  const priceOrZero = Number.isNaN(price) ? 0 : price; // in case the number is NaN, return 0 to prevent a runtime error
  return BigInt(Number(`${priceOrZero}e${decimals}`));
};
