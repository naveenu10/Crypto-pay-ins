import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Detecting from "./pages/Detecting/Detecting";
import Failure from "./pages/Failure/Failure";
import QuickPay from "./pages/QuickPay/QuickPay";
import Success from "./pages/Success/Success";
import Timeout from "./pages/Timeout/Timeout";
import Wallet from "./pages/Wallet/Wallet";
import DepositPage from "./pages/DepositPage/DepositPage";
import MetaMaskPage from "./pages/metaMask/MetaMaskPage";
import Error from "./pages/Error/Error";
import theme from "./theme/theme";
import QrScanPage from "./pages/QrScan";
import WelcomePage from "./pages/Welcome/WelcomePage";
import MetaMaskConnectedComponent from "./pages/metaMask/MetaMaskConnectedComponent";
import QrMounting from "./pages/QrScan/QrMounting";
import { Layout, MobileContainer } from "./styles/layout";

const duration = 15 * 60 * 1000;

function App() {
  const [time, setTime] = useState<number>(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const routes = [
    { path: "/order", element: <WelcomePage /> },
    { path: "/deposit/order", element: <DepositPage /> },
    { path: "/quickpay", element: <QuickPay /> },
    { path: "/detecting", element: <Detecting /> },
    { path: "/success", element: <Success /> },
    { path: "/failure", element: <Failure /> },
    { path: "/timeout", element: <Timeout /> },
    { path: "/wallet", element: <Wallet /> },
    { path: "/QrMounting", element: <QrMounting /> },
    { path: "/qr-code", element: <QrScanPage /> },
    { path: "/metamask_scan", element: <MetaMaskPage /> },
    { path: "/metamask_wallet", element: <MetaMaskConnectedComponent /> },
    { path: "/error", element: <Error /> },
  ].map((route) => ({
    ...route,
    element: React.cloneElement(route.element, { fixedTime: formattedTime }),
  }));

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <MobileContainer>
          <BrowserRouter>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </MobileContainer>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
