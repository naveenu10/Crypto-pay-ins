import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detecting from "./pages/Detecting/Detecting";
import Failure from "./pages/Failure/Failure";
import LowBalSuccess from "./pages/LowBalSuccess/LowBalSuccess";
import InsufficientFunds from "./pages/QrScan/InsufficientFundsError";
import Metamask from "./pages/QrScan/MetamaskError";
import QrCopy from "./pages/QrScan/QrCopy";
import { default as QrScan, default as QrScanPage } from "./pages/QrScan/QrScanPage";
import QuickPay from "./pages/QuickPay/QuickPay";
import Success from "./pages/Success/Success";
import Timeout from "./pages/Timeout/Timeout";
import Wallet from "./pages/Wallet/Wallet";
import WithdrawPage from "./pages/WithdrawPage/WithdrawPage";
import MetaMaskPage from "./pages/metaMask/MetaMaskPage";
import theme from "./theme/theme";
import MeatamaskExample from "./pages/MeatamaskExample";
import { MetaMaskProvider } from "metamask-react";
import MetamaskError from "./pages/QrScan/MetamaskError";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WithdrawPage />} />
          <Route path="/quickpay" element={<QuickPay />} />
          <Route path="/detecting" element={<Detecting />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/timeout" element={<Timeout />} />
          <Route path="/lowbalsuccess" element={<LowBalSuccess />} />
          <Route path="/highbalsuccesspage" element={<LowBalSuccess />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/QrScan" element={<QrScan />} />
          <Route path="/QrScanPage" element={<QrScanPage />} />
          <Route path="/QrCopy" element={<QrCopy />} />
          <Route path="/metamaskError" element={<MetamaskError />} />
          <Route path="/MetamaskPage" element={<MetaMaskProvider><MetaMaskPage /></MetaMaskProvider>} />
          <Route path="/InsufficientFunds" element={<InsufficientFunds />} />
          <Route path="/metamaskintegration" element={<MetaMaskProvider><MeatamaskExample /></MetaMaskProvider>} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
