export default function formatCryptoAmount(cryptoName: string, amount: string):string  {
  // Convert the amount to a numeric value
  const numericAmount = parseFloat(amount);

  // Check if the numericAmount is a valid number
  if (isNaN(numericAmount)) {
    return "Invalid amount";
  }

  // Define the number of decimal places based on the crypto name
  let decimalPlaces;
  switch (cryptoName) {
    case "BTC":
      decimalPlaces = 7;
      break;
    case "ETH":
      decimalPlaces = 6;
      break;
    case "USDT":
      decimalPlaces = 2;
      break;
    case "USDC":
      decimalPlaces = 2;
      break;
    case "DOGE":
      decimalPlaces = 1;
      break;
    case "LTC":
      decimalPlaces = 4;
      break;
    case "BCH":
      decimalPlaces = 5;
      break;
    case "MATIC":
      decimalPlaces = 3;
      break;
    case "USD":
      decimalPlaces = 2;
      break;
    default:
      decimalPlaces = 2;
      break;
  }

  // Format the amount with the specified decimal places
  const formattedAmount:string  = numericAmount.toFixed(decimalPlaces);

  // Return the formatted amount with the crypto name
  return formattedAmount;
}
