import { ChainTokens, EVM_NETWORKS, supportedEVMNetworkTokensList } from '@/utils/constants';

/**
 * Return tokens that are supported in current network
 * @param chainId
 */
export const getSupportedTokens = (chainId: number | undefined): ChainTokens => {
  if (!chainId) return [];

  return supportedEVMNetworkTokensList[chainId as EVM_NETWORKS] || [];
};
