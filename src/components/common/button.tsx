import clsx from 'clsx';

type CustomProps = {
  color: 'string';
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement & CustomProps
>;

export const Button = (props: Props) => {
  const { className, children, ...rest } = props;
  const merged = clsx(
    'flex justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-pink-600',
    className,
  );

  return (
    <button className={merged} {...rest}>
      {children}
    </button>
  );
};
