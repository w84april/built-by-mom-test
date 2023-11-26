export const getIpfsCidFromGatewayUrl = (gatewayUrl = '') => {
  if (!gatewayUrl.includes('ipfs')) {
    return '';
  }
  const parts = gatewayUrl.split('/ipfs/');
  return parts[parts.length - 1];
};
