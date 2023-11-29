import { EvmAddress } from '@/types/common';
import { getSupportedTokens } from './get-supported-tokens';
import { isAddressEqual } from 'viem';

/**
 * Returns token info by its address
 * @param address token address
 * @param chainId
 * @returns
 */
export const getTokenInfo = ({
  address,
  chainId,
}: {
  address: EvmAddress | undefined;
  chainId: number | undefined;
}) => {
  const supportedTokens = getSupportedTokens(chainId);
  if (!address || supportedTokens.length === 0) return null;
  return supportedTokens.find((token) => isAddressEqual(address, token.address));
};
