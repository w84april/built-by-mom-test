import { EvmAddress } from '@/types/common';
import { isAddress } from 'viem';
import { invariant } from './invariant';

export const getIsValidEvmAddress = (testedString: unknown): testedString is EvmAddress => {
  if (!testedString || typeof testedString !== 'string') return false;
  return isAddress(testedString);
};

export function assertIsValidEthereumAddress(value: unknown): asserts value is EvmAddress {
  invariant(getIsValidEvmAddress(value), `Expected EVM address, got ${value}`);
}
