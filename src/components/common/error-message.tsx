import { FieldError } from 'react-hook-form';

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  return <div className="h-4 text-red-500">{error && error.message}</div>;
};
