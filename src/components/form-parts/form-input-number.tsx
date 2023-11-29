import { InputHTMLAttributes } from 'react';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { percentOf } from '@/utils/common/percent-of';
import { Balances } from '@/hooks/use-get-multiple-balances';
import { useFormContext } from 'react-hook-form';
import { useNetwork } from 'wagmi';
import { getTokenInfo } from '@/utils/token/get-token-info';
import { convertUnitsToNumber } from '@/utils/convert/convert-units-to-number';

const percentIntervals = [25, 50, 75, 100];

type Props = {
  balances: Balances;
  name: string;
  label?: string;
  shouldDisplayPercentButtons?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputNumber = ({
  value,
  name,
  label,
  balances,
  shouldDisplayPercentButtons = false,
}: Props) => {
  const { chain } = useNetwork();
  const { register, watch, setValue } = useFormContext();
  const selectedTokenAddress = watch('token');
  const bigSelectedTokenBalance = selectedTokenAddress ? balances[selectedTokenAddress] : BigInt(0);

  const tokenInfo = getTokenInfo({ address: selectedTokenAddress, chainId: chain?.id });

  const selectedTokenBalance =
    convertUnitsToNumber(bigSelectedTokenBalance, tokenInfo?.decimals) || 0;

  const onPercentButtonClick = (percent: number) => {
    setValue(name, percentOf(selectedTokenBalance, percent), { shouldValidate: true });
  };

  return (
    <div>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row">
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        )}
        {shouldDisplayPercentButtons && (
          <div className="flex gap-1">
            {percentIntervals.map((percent) => (
              <Button
                key={percent}
                type="button"
                className="leading-3 text-xs px-1.5 py-0.5"
                onClick={() => onPercentButtonClick(percent)}
              >
                {percent === 100 ? 'max' : `${percent}%`}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Input
          value={value}
          name={name}
          type={'number'}
          step="any"
          placeholder="0"
          register={register}
          options={{
            required: 'Required',
            validate: {
              positiveNumber: (value) => parseFloat(value) > 0 || 'Must be higher than 0',
            },
          }}
        />
      </div>
    </div>
  );
};
