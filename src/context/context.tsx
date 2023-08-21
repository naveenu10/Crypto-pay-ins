import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
const initialState = {
  isTimer: Number,
  selectedCoin: "",
  orderDetails: "",
  orderId: "",
  hash: "",
  token: "",
  allCryptos: "",
  selectedCoinData: "",
  selectedCoinNetwork: "",
  qrData: "",
  transactionDetails: "",
  metamaskTransaction: "",
  metamaskPaymentDetails: "",
  email:""
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
