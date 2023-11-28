import { InputHTMLAttributes } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  register: UseFormRegister<FieldValues>;
  name: string;
  options?: RegisterOptions<FieldValues, string> | undefined;
};

export const Input = (props: Props) => {
  const { className, children, options, name, register, ...rest } = props;
  const merged = twMerge(
    'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 !outline-none sm:text-sm sm:leading-6',
    className,
  );
  return <input className={merged} {...register(name, options)} {...rest} />;
};
