import { ChainTokens, EVM_NETWORKS, supportedEVMNetworkTokensList } from '@/utils/constants';
import { useNetwork } from 'wagmi';

export const useGetSupportedTokens = (): ChainTokens => {
  const { chain } = useNetwork();

  if (!chain) return [];

  return supportedEVMNetworkTokensList[chain.id as EVM_NETWORKS];
};
