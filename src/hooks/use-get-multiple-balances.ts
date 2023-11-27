import { EvmAddress } from '@/types/common';
import { ChainTokens } from '@/utils/constants';
import { formatUnitsToNumber } from '@/utils/format/format-units-to-number';
import { erc20ABI, useContractReads } from 'wagmi';

export type Balances = Record<EvmAddress, number>;

// Wagmi provides us with useBalance hook which is siutable for fetching single token balance.
// This hook will help us to fetch multiple token balances efficiently.
export const useGetMultipleBalances = ({
  address,
  tokens,
}: {
  address: EvmAddress | undefined;
  tokens: ChainTokens;
}): { balances: Balances; isLoading: boolean; error: Error | null } => {
  const callBalanceOfConfig = {
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address || ''],
  };
  const contracts = tokens.map((item) => ({
    address: item.address,
    ...callBalanceOfConfig,
  }));

  const { data, error, isLoading } = useContractReads({
    contracts: contracts,
    enabled: !!address && tokens.length > 0,
  });

  const balances: Balances =
    data?.reduce((acc, current, i) => {
      const token = tokens[i];
      const result = typeof current.result === 'bigint' ? current.result : BigInt(0);
      return {
        ...acc,
        [token.address]: formatUnitsToNumber(result, token.decimals),
      };
    }, {}) || {};

  return { balances, error, isLoading };
};