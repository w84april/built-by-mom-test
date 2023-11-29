/**
 * Returns true if balanceOwned >= balanceRequired
 * @param balanceOwned
 * @param balanceRequired
 */
export const getIsSufficientBalance = (
  balanceOwned: bigint | undefined,
  balanceRequired: bigint,
) => {
  return balanceRequired === BigInt(0) || (!!balanceOwned && balanceOwned >= balanceRequired);
};
