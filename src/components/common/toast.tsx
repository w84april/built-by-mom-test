import { ToastType } from './toast-provider';
import Image from 'next/image';

export const Toast = ({ id, message, status }: ToastType) => (
  <div
    key={id}
    className="max-w-xs mt-1 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
    role="alert"
  >
    <div className="flex p-4">
      <div className="flex-shrink-0">
        <Image
          className="flex-shrink-0 h-4 w-4 mt-0.5"
          src={status === 'error' ? '/error.svg' : '/success.svg'}
          alt="Status"
          width={16}
          height={16}
        />
      </div>
      <div className="ms-3">
        <p className="text-sm text-gray-700 dark:text-gray-400">{message}</p>
      </div>
    </div>
  </div>
);
