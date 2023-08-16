import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
const initialState = {
  isTimer: Number,
  selectedCoin: "BTC",
  orderDetails:'',
  
  orderId: "",
  token: "",
  allCryptos: [
    {
        "asset_name": "Dogecoin",
        "asset_network": "Dogecoin",
        "asset_symbol": "DOGE",
        "asset_amount": "0",
        "created_at": "2023-08-16T08:25:46.973Z",
        "quote_id": "98a07ad7-8793-4568-bfb8-e2498c764008"
    },
    {
        "asset_name": "Bitcoin Cash",
        "asset_network": "Bitcoin Cash",
        "asset_symbol": "BCH",
        "asset_amount": "0",
        "created_at": "2023-08-16T08:25:47.020Z",
        "quote_id": "43163e8b-7b98-4769-b107-f6fed353bd02"
    },
    {
        "asset_name": "Litecoin",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673258424/Ellipse_2_ya5eea.svg",
        "asset_network": "Litecoin",
        "asset_symbol": "LTC",
        "asset_amount": "0",
        "created_at": "2023-08-16T08:25:47.094Z",
        "quote_id": "de330c17-7f85-43c8-a1a3-c6d0ccf5fa49"
    },
    {
        "asset_name": "Ether",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png",
        "asset_network": "Ethereum",
        "asset_symbol": "ETH",
        "asset_amount": "0.000548",
        "created_at": "2023-08-16T08:25:47.141Z",
        "quote_id": "43d73f80-2809-4ab0-a07a-99654c2363f8"
    },
    {
        "asset_name": "Tether",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png",
        "asset_network": "Ethereum",
        "asset_symbol": "USDT",
        "asset_amount": "1",
        "created_at": "2023-08-16T08:25:47.263Z",
        "quote_id": "248a280a-3cc8-4201-a0a2-97e016c89b67"
    },
    {
        "asset_name": "Bitcoin",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673250859/bitcoin_hkrwcs.svg",
        "asset_network": "Bitcoin Testnet",
        "asset_symbol": "BTC",
        "asset_amount": "0.0000343",
        "created_at": "2023-08-16T08:25:47.314Z",
        "quote_id": "9f17ca6e-eff6-451d-a94f-e0804568691f"
    },
    {
        "asset_name": "Tether",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png",
        "asset_network": "Sepolia",
        "asset_symbol": "USDT",
        "asset_amount": "1",
        "created_at": "2023-08-16T08:25:47.362Z",
        "quote_id": "e6957c38-946e-40a4-b188-2200d93bfdad"
    },
    {
        "asset_name": "Bitcoin",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673250859/bitcoin_hkrwcs.svg",
        "asset_network": "Bitcoin",
        "asset_symbol": "BTC",
        "asset_amount": "0.0000343",
        "created_at": "2023-08-16T08:25:47.385Z",
        "quote_id": "229d9d96-fa2e-4422-86ae-54ae08b337c1"
    },
    {
        "asset_name": "Ether",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png",
        "asset_network": "Sepolia",
        "asset_symbol": "ETH",
        "asset_amount": "0.000548",
        "created_at": "2023-08-16T08:25:47.449Z",
        "quote_id": "7eed72de-55c9-4b2f-b8c2-2c3a25f45086"
    },
    {
        "asset_name": "Tether",
        "asset_image": "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png",
        "asset_network": "Goerli",
        "asset_symbol": "USDT",
        "asset_amount": "1",
        "created_at": "2023-08-16T08:25:47.503Z",
        "quote_id": "532aa1e4-697e-497b-b888-069022af65cd"
    }
],
  selectedCoinData: "",
  selectedCoinNetwork: "",
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
  metamaskPaymentDetails: "",
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
