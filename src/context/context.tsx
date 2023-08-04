import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
const initialState = {
  isTimer: Number,
  selectedCoin: "BTC",
  orderDetails: {
    uuid: "56fca901-5340-4287-ab4d-5e3ca69a91bf",
    id: "ALDBQHMJ1U",
    user_wallet_address: null,
    order_status: null,
    order_user_email_id: null,
    selected_asset_network: null,
    selected_asset_amount: null,
    merchant_brand_name: "Cryptogames",
    transaction_amount: null,
    transaction_asset_symbol: null,
    transaction_asset_name: null,
    transaction_asset_network: null,
    transaction_hash: null,
    transaction_hash_explorer_url: null,
    selected_asset_symbol: null,
    user_action: null,
    user_action_timer_status: null,
    hash: "1441a7909c087dbbe7ce59881b9df8b9",
    order_fiat_amount: null,
    order_fiat_symbol: null,
    order_crypto_amount: null,
    order_crypto_symbol: null,
    order_amount: "1.00",
    sender_wallet_addresses: null,
    transactions: null,
    transactionId: null,
    order_currency_symbol: "usd",
    order_currency_type: "fiat",
    user_id: "1xdev",
    merchant_id: "M0314533",
    user_email_id: "aruns@nu10.co",
    user_first_name: "arun",
    user_last_name: "kumar",
    merchant_redirect_url: "https://nivapay.com",
    merchant_txn_id: null,
    action: "deposit",
    testnet: null,
    merchant_webhook_url: null,
    expiration_time: null,
    AddressGenerationTime: "2023-07-25T11:17:40.453Z",
    confirmedAt: "2023-07-25T11:17:40.453Z",
    timestamp: "1690285660442",
    iat: 1690283879,
    exp: 1690287479,
  },
  orderId: "",
  token: "",
  allCryptos: [
    {
      asset_name: "Bitcoin",
      asset_network: "Bitcoin",
      asset_symbol: "BTC",
      asset_quote: "0.003334",
      asset_image:
        "data:image/png;base64,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",
    },
    {
      asset_name: "Ether",
      asset_network: "Ethereum",
      asset_symbol: "ETH",
      asset_quote: "0.05446",
      asset_image:
        "data:image/png;base64,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",
    },
  ],
  selectedCoinData: "",
  qrData: {
    qr_string:
      "http://datagenetics.com/blog/november12013/test.png",
    asset_amount: "0.003334",
    wallet_address:'37UPTD8u3cpZ7Vwg2vQqNtwwVmRRp6mRgT'
  },
  transactionDetails: {
    uuid: "56fca901-5340-4287-ab4d-5e3ca69a91bf",
    order_id: "ALDBQHMJ1U",
    user_wallet_address: null,
    order_status: null,
    order_user_email_id: null,
    selected_asset_network: null,
    selected_asset_amount: null,
    merchant_brand_name: "Cryptogames",
    transaction_amount: "0.003334",
    transaction_asset_symbol: "BTC",
    transaction_asset_name: null,
    transaction_asset_network: null,
    transaction_hash: "f0478d2b40a35e455ae640ec1b0762df8c46b975cb19672b63aaf236ad7ca2b9",
    transaction_hash_explorer_url: null,
    selected_asset_symbol: null,
    user_action: null,
    user_action_timer_status: null,
    hash: "1441a7909c087dbbe7ce59881b9df8b9",
    order_fiat_amount: null,
    order_fiat_symbol: null,
    order_crypto_amount: "0.003334",
    order_crypto_symbol: "BTC",
    order_amount: "1.00",
    sender_wallet_addresses: null,
        order_currency_symbol: "usd",
    order_currency_type: "fiat",
    user_id: "1xdev",
    merchant_id: "M0314533",
    user_email_id: "aruns@nu10.co",
    user_first_name: "arun",
    user_last_name: "kumar",
    merchant_redirect_url: "https://nivapay.com",
    merchant_txn_id: null,
    action: "deposit",
    testnet: null,
    merchant_webhook_url: null,
    expiration_time: null,
    AddressGenerationTime: "2023-07-25T11:17:40.453Z",
    confirmedAt: "2023-07-25T11:17:40.453Z",
    timestamp: "1690285660442",
    iat: 1690283879,
    exp: 1690287479,
    destination_wallet_address:"37UPTD8u...mRgT"
  },
  metamaskTransaction: "",
};

const AppContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state: { ...state },
        dispatch,
      }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useGlobalContext };
