import { Balances } from '@/hooks/use-get-multiple-balances';
import { EvmAddress } from '@/types/common';
import { getIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { ChangeEventHandler } from 'react';

type Props = {
  label?: string;
  name: string;
  options: { value: string; title: string }[];
  balances?: Balances;
  handleChange: ChangeEventHandler<HTMLSelectElement> | undefined;
};

export const FormSelectToken = ({ label, name, balances, options, handleChange }: Props) => {
  const isDisabled = options.length === 0;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      )}
      <select
        className="flex text-gray-900 items-center w-full mt-2 justify-between border-solid border-r-8 border-transparent rounded-md text-md pl-2 py-1.5 outline-2 outline-pink-500 focus:outline ring-1 ring-gray-300"
        name={name}
        onChange={handleChange}
        disabled={isDisabled}
        placeholder={isDisabled ? 'No tokens' : undefined}
      >
        {isDisabled ? (
          <option>No tokens found</option>
        ) : (
          options.map(({ value, title }) => (
            <option key={value} value={value}>
              {title}
              {balances && getIsValidEvmAddress(value) ? ` - ${balances[value]}` : ''}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
