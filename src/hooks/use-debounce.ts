import { useEffect, useState } from 'react';

export const useDebounce = <ValueType>(
  value: ValueType,
  delay: number,
): { debouncedValue: ValueType; isLoading: boolean } => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      setIsLoading(true);
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        setIsLoading(false);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return { debouncedValue, isLoading };
};
