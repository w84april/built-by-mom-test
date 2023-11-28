import { ChainTokens, EVM_NETWORKS, supportedEVMNetworkTokensList } from '@/utils/constants';

export const getSupportedTokens = (chainId: number | undefined): ChainTokens => {
  if (!chainId) return [];

  return supportedEVMNetworkTokensList[chainId as EVM_NETWORKS] || [];
};
