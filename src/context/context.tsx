import React, { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";
const initialState = {
  isTimer: Number,
  selectedCoin: "",
  orderDetails: "",
  orderId: "",
  token: "",
  allCryptos: "",
  selectedCoinData:'',
  qrData:''
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
