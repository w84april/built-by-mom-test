import { EvmAddress } from '@/types/common';
import { useEnsAvatar, useEnsName, useNetwork } from 'wagmi';

type HookArgs = {
  address: EvmAddress;
};

type HookOptions = {
  skip?: boolean;
};

/**
 * Returns ENS Avatar & ENS Name by address. Object fields are null if corresponding data doesn't exist
 * @param address connected account address
 * @param skip can be retreived from options param, if true useEnsName and useEnsAvatar are not triggered
 */
export const useEns = ({ address }: HookArgs, options?: HookOptions) => {
  const { skip = false } = options ?? {};

  const { chain } = useNetwork();

  const { data: ensName } = useEnsName({
    address,
    chainId: chain?.id,
    enabled: !skip && !!address,
  });

  const ensAvatar = useEnsAvatar({
    name: ensName,
    chainId: chain?.id,
    enabled: !!ensName,
  });

  const ensAvatarUrl = ensAvatar.data || null;

  return {
    ensName,
    ensAvatarUrl,
  };
};
