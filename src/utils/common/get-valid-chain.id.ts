import { invariant } from '../common/invariant';
import { EVM_NETWORKS } from '../constants';

export const getIsValidChainId = (value: unknown): value is EVM_NETWORKS => {
  return Object.values(EVM_NETWORKS).includes(value as EVM_NETWORKS); // check if the value is in the list of expected networks
};

export function assertIsValidChainId(value: unknown): asserts value is EVM_NETWORKS {
  invariant(getIsValidChainId(value), `Expected EVM chainId, got ${value}`);
}
