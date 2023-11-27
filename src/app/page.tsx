'use client';
import { AccountImage } from '@/components/account-image';
import { MyApp } from '@/components/my-app';
import { chains, wagmiConfig } from '@/utils/wagmi/wagmi-client';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { Inter } from 'next/font/google';
import { WagmiConfig } from 'wagmi';

// Would be nice to import it
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const rainbowKitDefaultTheme = lightTheme();
  const customTheme = { ...rainbowKitDefaultTheme, fonts: { body: inter.style.fontFamily } };
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions={true}
        avatar={AccountImage}
        theme={customTheme}
      >
        <MyApp />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}