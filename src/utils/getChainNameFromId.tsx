const getChainNameFromId = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return "Ethereum";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 42:
      return "Kovan";
    // case 56:
    //   return 'Binance Main Network';
    // case 97:
    //   return 'Binance Test Network';
    case 42:
      return "Kovan";
    case 137:
      return "Polygon";
    case 59140:
      return "Linea Testnet";
    case 11155111:
      return "Sepolia";
    default:
      return "Unknown";
  }
};

export default getChainNameFromId;
