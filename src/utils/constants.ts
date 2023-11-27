import { EvmAddress } from '@/types/common';
import { sepolia, mainnet } from 'wagmi';
import { goerli } from 'wagmi/chains';

export const EVM_NETWORKS = {
  ethereum: mainnet.id,
  sepolia: sepolia.id,
  goerli: goerli.id,
} as const;

export type EVM_NETWORKS = (typeof EVM_NETWORKS)[keyof typeof EVM_NETWORKS];

export type ChainToken = {
  symbol: string;
  decimals: number;
  address: EvmAddress;
  isNativeTokenWrapper?: boolean;
};

export type ChainTokens = ChainToken[];

export const daiToken = {
  [EVM_NETWORKS.ethereum]: {
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  [EVM_NETWORKS.sepolia]: {
    symbol: 'tDAI',
    address: '0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0',
    decimals: 18,
  },
  [EVM_NETWORKS.goerli]: {
    symbol: 'DAI',
    address: '0x9D233A907E065855D2A9c7d4B552ea27fB2E5a36',
    decimals: 18,
  },
} satisfies Record<EVM_NETWORKS, ChainToken | undefined>;

export const ethereumTokens = [daiToken[EVM_NETWORKS.ethereum]] satisfies ChainTokens;
export const sepoliaTokens = [daiToken[EVM_NETWORKS.sepolia]] satisfies ChainTokens;
export const goerliTokens = [daiToken[EVM_NETWORKS.goerli]] satisfies ChainTokens;

export const supportedEVMNetworkTokensList: Record<EVM_NETWORKS, ChainTokens> = {
  [EVM_NETWORKS.ethereum]: ethereumTokens,
  [EVM_NETWORKS.sepolia]: sepoliaTokens,
  [EVM_NETWORKS.goerli]: goerliTokens,
};
