import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

const { chains: wagmiChains, publicClient } = configureChains(
  [mainnet, sepolia, goerli],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_API_KEY || '' }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'built-by-mom-test',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: wagmiChains,
});

export const chains = wagmiChains;

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
