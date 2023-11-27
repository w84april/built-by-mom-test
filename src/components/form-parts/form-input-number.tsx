import { ChangeEventHandler } from 'react';
import { Input } from '../common/input';
import { Button } from '../common/button';
import { useFormikContext } from 'formik';
import { percentOf } from '@/utils/common/percent-of';
import { Balances } from '@/hooks/use-get-multiple-balances';
import { FormFields } from '../send-token-form';

const percentIntervals = [25, 50, 75, 100];

type Props = {
  value: number;
  name: string;
  balances: Balances;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  shouldDisplayPercentButtons?: boolean;
};

export const FormInputNumber = ({
  value,
  name,
  handleChange,
  label,
  balances,
  shouldDisplayPercentButtons = false,
}: Props) => {
  const { values, setFieldValue } = useFormikContext<FormFields>();

  const selectedTokenAmoount = values.token ? balances[values.token] : 0;

  const onPercentButtonClick = (percent: number) => {
    setFieldValue(name, percentOf(percent, selectedTokenAmoount));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        )}
        {shouldDisplayPercentButtons && (
          <div className="flex gap-1">
            {percentIntervals.map((percent) => (
              <Button
                key={percent}
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
        <Input value={value} name={name} onChange={handleChange} type={'number'} placeholder="0" />
      </div>
    </div>
  );
};
