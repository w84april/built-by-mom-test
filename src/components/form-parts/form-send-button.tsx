import { Button } from '../common/button';
import { useNetwork } from 'wagmi';
import { useFormContext } from 'react-hook-form';
import { Balances } from '@/hooks/use-get-multiple-balances';
import { convertNumberToBigInt } from '@/utils/format/convert-number-to-bigint';
import { getIsSufficientBalance } from '@/utils/token/get-is-sufficient-balance';
import { getTokenInfo } from '@/utils/token/get-token-info';
import { useGetAddressByEnsName } from '@/hooks/use-get-address-by-ens-name';

type Props = {
  balances: Balances;
};

export const FormSendButton = ({ balances }: Props) => {
  const { chain } = useNetwork();
  const { watch } = useFormContext();

  let disabledReason;

  /* ---- Start of address/ens name validation */
  const addressOrEnsName = watch('recipient');

  const { invalidRecipient } = useGetAddressByEnsName({ addressOrEnsName });
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
