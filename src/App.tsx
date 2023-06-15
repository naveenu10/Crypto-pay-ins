import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detecting from "./pages/Detecting/Detecting";
import Failure from "./pages/Failure/Failure";
import LowBalSuccess from "./pages/LowBalSuccess/LowBalSuccess";
import InsufficientFunds from "./pages/QrScan/InsufficientFundsError";
// import Metamask from "./pages/QrScan/MetamaskError";
import QrCopy from "./pages/QrScan/QrCopy";
import {
  default as QrScan,
  default as QrScanPage,
} from "./pages/QrScan/QrScanPage";
import QuickPay from "./pages/QuickPay/QuickPay";
import Success from "./pages/Success/Success";
import Timeout from "./pages/Timeout/Timeout";
import Wallet from "./pages/Wallet/Wallet";
import DepositPage from "./pages/DepositPage/DepositPage";
import MetaMaskPage from "./pages/metaMask/MetaMaskPage";
import WelcomePage from "./pages/Welcome/WelcomePage";
import Error from "./pages/Error/Error";
import theme from "./theme/theme";
import MeatamaskExample from "./pages/MeatamaskExample";
import MetamaskError from "./pages/QrScan/MetamaskError";
import { useEffect, useState } from "react";

function App() {
  const [timeFlag, setTimeFlag] = useState(false)
  const duration = 15 * 60 * 1000;
  const [time, setTime] = useState<any>(duration);
  useEffect(() => {
    setTimeout(() => {
      if (time) {
        setTime(time - 1000);
      } else {
        setTimeFlag(true);
      }
    }, 1000);
  }, [time]);
  let totalSeconds = Math.floor(time / 1000);
  let totalMinitus = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let minitus = totalMinitus % 60;
  let fixedTime = `${minitus < 10 ? `0${minitus}` : minitus}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/deposit"
            element={<DepositPage fixedTime={fixedTime} />}
          />
          <Route
            path="/quickpay"
            element={<QuickPay fixedTime={fixedTime} />}
          />
          <Route path="/detecting" element={<Detecting />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/timeout" element={<Timeout />} />
          <Route path="/lowbalsuccess" element={<LowBalSuccess />} />
          <Route path="/highbalsuccesspage" element={<LowBalSuccess />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/QrScan" element={<QrScan />} />
          <Route path="/metamaskError" element={<MetamaskError />} />
          <Route path="/metamaskExample" element={<MeatamaskExample />} />
          <Route
            path="/QrScanPage"
            element={<QrScanPage fixedTime={fixedTime} />}
          />
          <Route path="/QrCopy" element={<QrCopy fixedTime={fixedTime} />} />
          {/* <Route path="/Metamask" element={<Metamask />} /> */}
          <Route
            path="/metamask"
            element={<MetaMaskPage fixedTime={fixedTime} />}
          />
          <Route path="/InsufficientFunds" element={<InsufficientFunds />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
