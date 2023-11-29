'use client';
import { AccountImage } from '@/components/common/account-image';
import ErrorBoundary from '@/components/common/error-boundary';
import { ToastProvider } from '@/components/common/toast-provider';
import { MyApp } from '@/components/my-app';
import { chains, wagmiConfig } from '@/utils/wagmi/wagmi-client';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { Inter } from 'next/font/google';
import { WagmiConfig } from 'wagmi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const rainbowKitDefaultTheme = lightTheme();
  const customTheme = { ...rainbowKitDefaultTheme, fonts: { body: inter.style.fontFamily } };

  return (
    <ErrorBoundary>
      <ToastProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            locale="en-US"
            chains={chains}
            avatar={AccountImage}
            theme={customTheme}
          >
            <MyApp />
          </RainbowKitProvider>
        </WagmiConfig>
      </ToastProvider>
    </ErrorBoundary>
  );
}
