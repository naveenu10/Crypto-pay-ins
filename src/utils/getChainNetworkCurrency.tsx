const getChainNetworkCurrency = (chainId: number): string => {
    switch (chainId) {
      case 1:
        return "ETH";
      case 3:
        return "ETH";
      case 4:
        return "ETH";
      case 5:
        return "ETH";
      case 42:
        return "ETH";
      // case 56:
      //   return 'Binance Main Network';
      // case 97:
      //   return 'Binance Test Network';
      case 137:
        return "MATIC";
      case 59140:
        return "ETH";
      case 11155111:
        return "ETH";
      default:
        return "";
    }
  };

  export default getChainNetworkCurrency;