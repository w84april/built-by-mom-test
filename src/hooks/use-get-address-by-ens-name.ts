import { getIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { useEnsAddress } from 'wagmi';

/**
 * Returns the address of an ENS name if there is ENS Name related to the address.
 * @param addressOrEnsName
 * @returns
 */
export const useGetAddressByEnsName = ({ addressOrEnsName }: { addressOrEnsName: string }) => {
  const { data: addressByEnsName } = useEnsAddress({
    name: addressOrEnsName,
    enabled: false, // Hook doesn't work properly if we don't provide it with enable: false param. Might open github issue
  });

  const recipient = addressByEnsName || addressOrEnsName;

  const invalidRecipient = !getIsValidEvmAddress(recipient);
  return { recipient, invalidRecipient };
};
