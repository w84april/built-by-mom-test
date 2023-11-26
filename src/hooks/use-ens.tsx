import { EvmAddress } from '@/types/common';
import { getIpfsCidFromGatewayUrl } from '@/utils/ipfs/get-ipfs-cid';
import { useEnsAvatar, useEnsName, useNetwork } from 'wagmi';

export const getEnsAvatarUrl = (ensAvatar: ReturnType<typeof useEnsAvatar>) => {
  if (!ensAvatar?.data) return undefined;

  const ipfsCid = getIpfsCidFromGatewayUrl(ensAvatar?.data);

  return ipfsCid
    ? `chocolate-gleaming-armadillo-579.mypinata.cloud/ipfs/${ipfsCid}`
    : ensAvatar.data;
};

type HookArgs = {
  address: EvmAddress;
};

type HookOptions = {
  skip?: boolean;
};

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

  const ensAvatarUrl = getEnsAvatarUrl(ensAvatar);

  return {
    ensAvatar,
    ensAvatarUrl,
  };
};
