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
function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
