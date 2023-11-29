import { getIsValidEvmAddress } from '@/utils/common/get-is-valid-evm-address';
import { useEnsAddress } from 'wagmi';

export const useGetAddressByEnsName = ({ addressOrEnsName }: { addressOrEnsName: string }) => {
  //Get the address of an ENS name
  const { data: addressByEnsName } = useEnsAddress({
    name: addressOrEnsName,
    enabled: false, // Hook doesn't work properly if we don't provide it with enable: false param. Might open github issue
  });

  const recipient = addressByEnsName || addressOrEnsName;

  const invalidRecipient = !getIsValidEvmAddress(recipient);
  return { recipient, invalidRecipient };
};
