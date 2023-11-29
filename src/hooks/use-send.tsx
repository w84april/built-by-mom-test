import { convertNumberToBigInt } from '@/utils/format/convert-number-to-bigint';
import { getTokenInfo } from '@/utils/token/get-token-info';
import { erc20ABI, useNetwork, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useDebounce } from './use-debounce';
import { EvmAddress } from '@/types/common';
import { useGetAddressByEnsName } from './use-get-address-by-ens-name';

export const useSend = ({
  recipient,
  token,
  amount,
}: {
  recipient: string;
  token: EvmAddress | undefined;
  amount: number;
}) => {
  const { chain } = useNetwork();

  const debouncedAmount = useDebounce(amount, 500);
  const debouncedRecipient = useDebounce(recipient, 500);

  const tokenInfo = getTokenInfo({ address: token, chainId: chain?.id });

  const { recipient: recipientAddress, invalidRecipient } = useGetAddressByEnsName({
    addressOrEnsName: debouncedRecipient,
  });

  const tokenValue =
    debouncedAmount && tokenInfo?.decimals
      ? convertNumberToBigInt(debouncedAmount, tokenInfo?.decimals)
      : BigInt(0);

  const { config } = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: 'transfer',
    args: invalidRecipient ? undefined : [recipientAddress as EvmAddress, tokenValue], // Type casting is safe here because we check address validity beforehand
    enabled: !invalidRecipient,
  });

  const { data, isLoading, isSuccess, error, write } = useContractWrite(config);
  return { isLoading, isSuccess, error, write };
};
