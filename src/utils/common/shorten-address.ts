/**
 * Shorten long addresses by adding ellipsis in between
 *
 * @param id
 * @param inMiddle
 * @param sliceSize
 */
export const shortenAddress = (id: string, inMiddle?: boolean, sliceSize = 4) => {
  if (id) {
    const beginning = id.slice(2, inMiddle ? sliceSize + 2 : 12);
    const end = id.slice(-sliceSize);

    return inMiddle ? `0x${beginning}...${end}` : `${beginning}${id.length > 12 ? '...' : ''}`;
  }

  return '';
};
