import { useEns } from '@/hooks/use-ens';
import { assertIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { AvatarComponent } from '@rainbow-me/rainbowkit';
import makeBlockie from 'ethereum-blockies-base64';
import Image from 'next/image';

export const AccountImage: AvatarComponent = ({ address, ensImage, size = 16 }) => {
  assertIsValidEvmAddress(address);

  // ensImage provided by RainbowKit will be present on Mainnet only, so we should fallback to fetched ensAvatarUrl. Fetch is skipped if ensImage is present.
  const { ensAvatarUrl } = useEns(
    {
      address,
    },
    { skip: !!ensImage },
  );

  const srcToUse = ensImage ?? ensAvatarUrl ?? makeBlockie(address);

  return <Image src={srcToUse} width={size} height={size} alt="Profile picture" />;
};
