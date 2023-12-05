import { useNavigate } from "react-router-dom";
import Timer from "../../../components/Timer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useGlobalContext } from "../../../context/context";

const metamaskIcon = require("../../../assets/icons/metmaskIcon.png");
const otherWalletIcon = require("../../../assets/icons/otherWalletIcon.png");

function TopSection({ fixedTime }: any) {
  const navigate = useNavigate();
  const context = useGlobalContext();

  const handleMetamask = () => {
    navigate("/metamask_scan", { replace: true });
  };

  const handleOtherWallets = () => {
    context.dispatch({
      type: "UPDATE_PREVIOUS_PATH",
      payload: "/wallet",
    });
    navigate("/QrMounting", { replace: true });
  };

  return (
    <section className="nivapay_ramp">
      <Timer fixedTime={fixedTime} />

      <div className="wallet-title" style={{ marginBottom: "18%" }}>
        Select Wallet
      </div>
      <div className="metaMaskDiv" onClick={handleMetamask}>
        <span className="metamaskImage" style={{ flex: 1 }}>
          <img
            src={metamaskIcon}
            alt="metamask logo"
            className="wallet-card-icon"
          />
        </span>
        <span className="wallet-card-title">MetaMask</span>
        <span>
          <ChevronRightIcon className="wallet-card-arrow" />
        </span>
      </div>
      <div className="metaMaskDiv" onClick={handleOtherWallets}>
        <span style={{ flex: 1 }}>
          <img
            src={otherWalletIcon}
            alt="other wallet logo"
            className="wallet-card-icon"
          />
        </span>
        <span className="wallet-card-title">Other&nbsp;Wallets</span>
        <span>
          <ChevronRightIcon className="wallet-card-arrow" />
        </span>
      </div>
    </section>
  );
}

export default TopSection;
