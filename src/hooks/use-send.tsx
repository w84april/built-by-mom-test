import { convertNumberToUnits } from '@/utils/convert/convert-number-to-units';
import { getTokenInfo } from '@/utils/token/get-token-info';
import {
  erc20ABI,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from './use-debounce';
import { EvmAddress } from '@/types/common';
import { useGetAddressByEnsName } from './use-get-address-by-ens-name';
import { UseFormReset } from 'react-hook-form';

export const useSend = ({
  recipient,
  token,
  amount,
  reset,
}: {
  recipient: string;
  token: EvmAddress | undefined;
  amount: number;
  reset: UseFormReset<{
    recipient: string;
    amount: number;
    token: `0x${string}` | undefined;
  }>;
}) => {
  const { chain } = useNetwork();

  const debouncedAmount = useDebounce(amount, 500);
  const debouncedRecipient = useDebounce(recipient, 500);

  const tokenInfo = getTokenInfo({ address: token, chainId: chain?.id });

  const { recipient: recipientAddress, invalidRecipient } = useGetAddressByEnsName({
    addressOrEnsName: debouncedRecipient,
  });

  const tokenValue = convertNumberToUnits(debouncedAmount, tokenInfo?.decimals);

  const { config, isLoading: isContractPreparing } = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: 'transfer',
    args: invalidRecipient ? undefined : [recipientAddress as EvmAddress, tokenValue], // Type casting is safe here because we check address validity beforehand
    enabled: !invalidRecipient,
  });

  const { data, isLoading: isLoading, write } = useContractWrite(config); // isLoading is true when user is promted to submit the transaction in the wallet

  const {
    isLoading: isPending, // True after submiting transaction in the wallet
    isSuccess,
    error,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => reset(),
  });

  return { isLoading: isLoading || isPending || isContractPreparing, isSuccess, error, write };
};
