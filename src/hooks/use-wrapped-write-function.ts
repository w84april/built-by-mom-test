import { useRef } from 'react';
import { BaseError } from 'viem';
import { useContractWrite } from 'wagmi';

/**
 * Wraps the wagmi writeAsync function to handle errors
 */
export const useWrappedWriteFunction = (
  writeAsync: ReturnType<typeof useContractWrite>['writeAsync'],
  onError?: (error: Error) => void,
  onBeforeStart?: () => void,
) => {
  const writeAsyncRef = useRef(writeAsync);
  writeAsyncRef.current = writeAsync;

  return async () => {
    if (writeAsyncRef.current) {
      try {
        onBeforeStart?.();
        return await writeAsyncRef.current();
      } catch (error) {
        console.log('Write error', error);
        onError?.(
          error instanceof BaseError ? new Error(error.details) : new Error('Something went wrong'),
        );
      }
    } else {
      const errorMessage = 'Contract write not prepared';
      console.error(errorMessage);
      onError?.(new Error(errorMessage));
    }
    return null;
  };
};
