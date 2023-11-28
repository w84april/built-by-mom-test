import { Balances } from '@/hooks/use-get-multiple-balances';
import { EvmAddress } from '@/types/common';
import { getIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { getTokenInfo } from '@/utils/common/get-token-info';
import { formatUnitsToNumber } from '@/utils/format/format-units-to-number';
import { ChangeEventHandler, InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister, useForm, useFormContext } from 'react-hook-form';
import { useNetwork } from 'wagmi';

type Props = {
  label?: string;
  name: string;
  options: { value: EvmAddress; title: string }[];
  balances?: Balances;
};

export const FormSelectToken = ({ label, name, balances, options }: Props) => {
  const { chain } = useNetwork();
  const { register } = useFormContext();

  const isDisabled = options.length === 0;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      )}
      <select
        className="flex text-gray-900 items-center w-full mt-2 justify-between border-solid border-r-8 border-transparent rounded-md text-md pl-2 py-1.5 outline-2 outline-pink-500 focus:outline ring-1 ring-gray-300"
        disabled={isDisabled}
        placeholder={isDisabled ? 'No tokens' : undefined}
        {...register(name, { required: 'Required' })}
      >
        {isDisabled ? (
          <option>No tokens found</option>
        ) : (
          options.map(({ value, title }) => {
            const tokenInfo = getTokenInfo({ address: value, chainId: chain?.id });
            const bigSelectedTokenBalance =
              balances && getIsValidEvmAddress(value) ? balances[value] : BigInt(0);
            const selectedTokenBalance =
              formatUnitsToNumber(bigSelectedTokenBalance, tokenInfo?.decimals) || 0;

            return (
              <option key={value} value={value}>
                {title}
                {balances && getIsValidEvmAddress(value) ? ` - ${selectedTokenBalance}` : ''}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
};
