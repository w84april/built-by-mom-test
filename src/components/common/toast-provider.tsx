import { ReactNode, createContext, useContext, useState } from 'react';
import { Toast } from './toast';

type ToastStatus = 'success' | 'error';
export type ToastType = { id: number; message: string; status: ToastStatus };
type AddToastFuncType = (value: {
  message: ToastType['message'];
  status?: ToastStatus;
  delay?: number;
}) => void;
type RemoveToastFuncType = (id: ToastType['id']) => void;

type ToastContextType = {
  toasts: ToastType[];
  addToast: AddToastFuncType;
  removeToast: RemoveToastFuncType;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('ToastContext not found');
  }
  return ctx;
};

type Props = { children: ReactNode };

export const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const removeToast: RemoveToastFuncType = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const addToast: AddToastFuncType = ({ message, status = 'success', delay = 5000 }) => {
    const newToast = {
      id: new Date().getTime(),
      message,
      status,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, delay);
  };

  const contextValue: ToastContextType = { toasts, addToast, removeToast };

  return (
    <ToastContext.Provider value={contextValue}>
      <div className="flex flex-col grow relative">
        {children}
        <div className="absolute left-1/2 -translate-x-1/2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
