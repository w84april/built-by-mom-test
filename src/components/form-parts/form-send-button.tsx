import { Button } from '../common/button';
import { useEnsAddress, useNetwork } from 'wagmi';
import { getIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { useFormContext } from 'react-hook-form';
import { Balances } from '@/hooks/use-get-multiple-balances';
import { convertNumberToBigInt } from '@/utils/format/convert-number-to-bigint';
import { getIsSufficientBalance } from '@/utils/token/get-is-sufficient-balance';
import { getTokenInfo } from '@/utils/token/get-token-info';

type Props = {
  balances: Balances;
};

export const FormSendButton = ({ balances }: Props) => {
  const { chain } = useNetwork();
  const { watch } = useFormContext();

  let disabledReason;

  /* ---- Start of address/ens name validation */
  const addressOrEnsName = watch('recipient');

  //Get the address of an ENS name
  const {
    data: addressByEnsName,
    error: addressByEnsNameError,
    isLoading: addressByEnsNameLoading,
  } = useEnsAddress({
    name: addressOrEnsName,
    enabled: false, // Hook doesn't work properly if we don't provide it with enable: false param. Might open github issue
  });

  const recipient = addressByEnsName || addressOrEnsName;

  const invalidRecipient = !getIsValidEvmAddress(recipient);
  if (invalidRecipient) disabledReason = 'Invalid address/ENS name';

  /* ---- Start of token balance insufficiency validation */
  const selectedTokenAddress = watch('token');
  const selectedTokenBalance = selectedTokenAddress ? balances[selectedTokenAddress] : BigInt(0);

  const tokenInfo = getTokenInfo({ address: selectedTokenAddress, chainId: chain?.id });

  const amountToBeSent = watch('amount');

  const bigAmountToBeSent =
    amountToBeSent && tokenInfo?.decimals
      ? convertNumberToBigInt(amountToBeSent, tokenInfo?.decimals)
      : BigInt(0);

  const isSufficientTokenBalance = getIsSufficientBalance(selectedTokenBalance, bigAmountToBeSent);
  if (!isSufficientTokenBalance) disabledReason = `Insufficient token balance`;

  const isDisabled = invalidRecipient || !isSufficientTokenBalance;

  return (
    <Button type="submit" className="w-full" disabled={isDisabled}>
      {isDisabled ? disabledReason : 'Send'}
    </Button>
  );
};
