import { EvmAddress } from '@/types/common';
import { getSupportedTokens } from './get-supported-tokens';
import { isAddressEqual } from 'viem';

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
