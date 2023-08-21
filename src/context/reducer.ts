const reducer = (state: any, action: { type: string; payload: any }): any => {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case "IS_TIMER":
      return {
        ...state,
        isTimer: action.payload,
      };
    case "UPDATE_NETWORK":
      return {
        ...state,
        selectedCoin: action.payload,
      };
    case "ORDER_DETAILS":
      return {
        ...state,
        orderDetails: action.payload,
      };
    case "ORDER_ID":
      return {
        ...state,
        orderId: action.payload,
      };
    case "UPDATE_HASH":
      return {
        ...state,
        hash: action.payload,
      };
    case "TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "ALL_CRYPTO":
      return {
        ...state,
        allCryptos: action.payload,
      };
    case "SELECTED_COIN":
      return {
        ...state,
        selectedCoinData: action.payload,
      };
    case "SELECTED_COIN_NETWORK":
      return {
        ...state,
        selectedCoinNetwork: action.payload,
      };
    case "GET_QR_DATA":
      return {
        ...state,
        qrData: action.payload,
      };
    case "UPDATE_TRANSACTION_DETAILS":
      return {
        ...state,
        transactionDetails: action.payload,
      };
    case "METAMASK_TRANSACTION_DETAILS":
      return {
        ...state,
        metamaskTransaction: action.payload,
      };
    case "METAMASK_PAYMENT_DETAILS":
      return {
        ...state,
        metamaskPaymentDetails: action.payload,
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
