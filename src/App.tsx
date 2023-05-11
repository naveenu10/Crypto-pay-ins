import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import WithdrawPage from "./pages/WithdrawPage/WithdrawPage";
import QuickPay from "./pages/QuickPay/QuickPay";
import Detecting from "./pages/Detecting/Detecting";
import Success from "./pages/Success/Success";
import Failure from "./pages/Failure/Failure";
import Timeout from "./pages/Timeout/Timeout";
import LowBalSuccess from "./pages/LowBalSuccess/LowBalSuccess";
import Wallet from "./pages/Wallet/Wallet";
import QrScan from "./pages/QrScan/ScanCopyTab";
import QrScanPage from "./pages/QrScan/QrScanPage";
import Metamask from "./pages/QrScan/MetamaskError";
import QrCopy from "./pages/QrScan/QrCopy";
import InsufficientFunds from "./pages/QrScan/InsufficientFundsError";
import MetaMaskPage from "./pages/metaMask/MetaMaskPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

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
          <Route path="/Metamask" element={<Metamask />} />
          <Route path="/MetamaskPage" element={<MetaMaskPage />} />
          <Route path="/InsufficientFunds" element={<InsufficientFunds />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
