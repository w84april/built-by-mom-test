import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { Input } from '../common/input';

type Props = {
  value: string | number;
  name: string;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
};

export const FormInputAddress = ({ value, name, handleChange, label }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        )}
      </div>
      <div className="mt-2">
        <Input value={value} name={name} onChange={handleChange} placeholder="0x0..." />
      </div>
    </div>
  );
};
