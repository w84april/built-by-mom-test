import { EvmAddress } from '@/types/common';
import { Chain, useNetwork } from 'wagmi';
import { getSupportedTokens } from './get-supported-tokens';
import { compareAddresses } from '@/utils/common/compare-addresses';

export const getTokenInfo = ({
  address,
  chainId,
}: {
  address: EvmAddress | undefined;
  chainId: number | undefined;
}) => {
  const supportedTokens = getSupportedTokens(chainId);
  if (!address || supportedTokens.length === 0) return null;
  return supportedTokens.find((token) => compareAddresses(address, token.address));
};
