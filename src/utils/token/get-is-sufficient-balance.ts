export const getIsSufficientBalance = (
  balanceOwned: bigint | undefined,
  balanceRequired: bigint,
) => {
  return balanceRequired === BigInt(0) || (!!balanceOwned && balanceOwned >= balanceRequired);
};
