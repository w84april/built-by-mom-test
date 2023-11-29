import { formatUnits } from 'viem';

/**
 * Formats a BigInt price to a number using the correct token decimal.
 *
 * If either param is undefined it returns null, so it should always be used with a fallback.
 *
 */
export const convertUnitsToNumber = (
  price: bigint | number | undefined,
  decimal: bigint | number | undefined,
) => {
  if (price === undefined || decimal === undefined) return null;

  return parseFloat(formatUnits(BigInt(price.toString()), Number(decimal)));
};
