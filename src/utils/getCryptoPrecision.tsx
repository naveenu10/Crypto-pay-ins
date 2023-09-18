interface CryptoPrecision {
  symbol: string;
  network: string;
  precision: number;
}

const cryptoPrecisions: CryptoPrecision[] = [
  { symbol: "BTC", network: "Bitcoin", precision: 7 },
  { symbol: "BTC", network: "Bitcoin Testnet", precision: 7 },
  { symbol: "ETH", network: "Ethereum", precision: 6 },
  { symbol: "ETH", network: "Sepolia", precision: 6 },
  { symbol: "USDT", network: "Ethereum", precision: 2 },
  { symbol: "USDT", network: "Sepolia", precision: 2 },
  { symbol: "BNB", network: "Binance Smart Chain", precision: 5 },
  { symbol: "BUSD", network: "Binance Smart Chain", precision: 2 },
  { symbol: "USDT", network: "Binance Smart Chain", precision: 2 },
  { symbol: "USDC", network: "Binance Smart Chain", precision: 2 },
  { symbol: "PZP", network: "Binance Smart Chain", precision: 1 },
  { symbol: "BNB", network: "Binance Smart Chain Testnet", precision: 5 },
  { symbol: "BUSD", network: "Binance Smart Chain Testnet", precision: 2 },
  { symbol: "USDT", network: "Binance Smart Chain Testnet", precision: 2 },
  { symbol: "USDC", network: "Binance Smart Chain Testnet", precision: 2 },
  { symbol: "PZP", network: "Binance Smart Chain Testnet", precision: 1 },
];

// Function to get precision based on crypto symbol and network
const getNumericPrecision = (
  symbol: string,
  network: string
): number | undefined => {
  const precisionEntry = cryptoPrecisions.find(
    (entry) => entry.symbol === symbol && entry.network === network
  );
  return precisionEntry ? precisionEntry.precision : undefined;
};

// Example usage:
const symbol = "ETH"; // Example crypto symbol
const network = "mainnet"; // Example crypto network
const precision = getNumericPrecision(symbol, network);

if (precision !== undefined) {
  console.log(`Numeric Precision for ${symbol} on ${network}: ${precision}`);
} else {
  console.log(`Precision not found for ${symbol} on ${network}`);
}

export default getNumericPrecision;
