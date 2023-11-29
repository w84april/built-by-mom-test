import { parseUnits } from 'viem';

/**
 * Converts a price represented as a number to BigInt
 *
 * @param price
 * @param decimals
 */
export const convertNumberToUnits = (
  price: number | string,
  decimals: number | undefined,
): bigint => {
  return price && decimals ? parseUnits(price.toString(), decimals) : BigInt(0);
};
