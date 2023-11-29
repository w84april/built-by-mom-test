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
import { useToastContext } from '@/components/common/toast-provider';
import { TransactionReceipt } from 'viem';
import { shortenAddress } from '@/utils/common/shorten-address';
import { useWrappedWriteFunction } from './use-wrapped-write-function';

export const useSend = ({
  recipient,
  token,
  amount,
  refetchBalances,
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
  refetchBalances: () => void;
}) => {
  const { chain } = useNetwork();

  const { addToast } = useToastContext();

  const { debouncedValue: debouncedAmount, isLoading: isLoadingAmount } = useDebounce(amount, 500);
  const { debouncedValue: debouncedRecipient, isLoading: isLoadingRecipient } = useDebounce(
    recipient,
    500,
  );

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

  const { data, isLoading: isLoading, writeAsync } = useContractWrite(config); // isLoading is true when user is promted to submit the transaction in the wallet

  const onSuccess = (data: TransactionReceipt) => {
    if (data.status !== 'success') return;
    const recipientAddress = `0x${data.logs.at(0)?.topics.at(2)?.slice(26)}`;
    const recipient = recipientAddress ? shortenAddress(recipientAddress, true) : 'recipient';

    addToast({
      message: `Succesfully sent token to ${recipient}`,
    });
    reset();
    refetchBalances();
  };

  const onError = (error: Error) => {
    addToast({
      message: error.message,
      status: 'error',
    });
    reset();
  };

  const {
    isLoading: isPending, // True after submiting transaction in the wallet
    isSuccess,
    error,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess,
    enabled: !invalidRecipient,
  });

  const onSend = useWrappedWriteFunction(writeAsync, onError);

  return {
    isLoading:
      isLoading || isPending || isContractPreparing || isLoadingAmount || isLoadingRecipient,
    isSuccess,
    error,
    onSend,
  };
};
