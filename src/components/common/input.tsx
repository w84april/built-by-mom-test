import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  const { className, children, ...rest } = props;
  const merged = clsx(
    'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 !outline-none sm:text-sm sm:leading-6',
    className,
  );
  return <input className={merged} {...rest} />;
};
