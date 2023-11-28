import { ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { Input } from '../common/input';
import { FieldValues, UseFormRegister, useForm, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputAddress = ({ name, label, ...rest }: Props) => {
  const { register } = useFormContext();

  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        )}
      </div>
      <div className="mt-2">
        <Input
          placeholder="0x0..."
          name={name}
          register={register}
          options={{ required: 'Required' }}
        />
      </div>
    </div>
  );
};
