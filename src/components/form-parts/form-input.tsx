import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

type Props = {
  value: string | number;
  name: string;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  type?: HTMLInputTypeAttribute;
  shouldDisplayPercentButtons?: boolean;
};

export const FormInput = ({
  value,
  name,
  handleChange,
  label,
  type,
  shouldDisplayPercentButtons = false,
}: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        )}
        {shouldDisplayPercentButtons && (
          <div className="flex gap-1">
            <button className="rounded-md bg-pink-400 px-1.5 py-1 text-sm text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-400">
              25%
            </button>
            <button className="rounded-md bg-pink-400 px-1.5 py-1 text-sm text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-400">
              50%
            </button>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 !outline-none sm:text-sm sm:leading-6"
          name={name}
          required
          value={value}
          type={type}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
