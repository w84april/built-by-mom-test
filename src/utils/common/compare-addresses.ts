// Lowercase both addresses before comparing them
export const compareAddresses = (address1: string, address2: string) => {
  return address1.toLowerCase() === address2.toLowerCase();
};