import { Button } from "@mui/material";
import Footer from "../../../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context/context";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { sendOrderEvent } from "../../../../services/depositServices";

function BottomSection(props: any) {
  const { setOpenCloseDialog, setShowErr } = props;
  const context = useGlobalContext();
  const navigate = useNavigate();
  const qrData = context.state.qrData;
  const token = context?.state?.token;

  const [address, setAddress] = useState<any | null>("");

  let currentAccount: string;
  function handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      setAddress("");
    } else if (accounts[0] !== currentAccount) {
      navigate("/metamask_wallet", { replace: true });
      currentAccount = accounts[0];
      setAddress(currentAccount);
    }
  }

  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  async function connectMetamask() {
    if (isMobileDevice()) {
      window.open(
        `${qrData?.metamask_app_url}&gasLimit=${qrData?.gasLimit_evm}`
      );
    } else {
      var ethereum: any = await detectEthereumProvider();
      if (ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then(handleAccountsChanged)
          .catch((err: { code: number | any }) => {
            if (err.code === 4001) {
            } else {
              console.log("Please select the Network");
            }
          });
      } else {
        setShowErr(true);
      }
    }
  }

  const handleIhavePaid = async () => {
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "user.action.transactionInitiated",
      asset_network: qrData?.asset_network,
      asset_symbol: qrData?.asset_symbol,
      asset_amount: qrData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      navigate("/detecting", { replace: true });
    }
  };

  return (
    <div className="footer">
      <div className="footer-buttons-container">
        <Button
          className="continue"
          variant="contained"
          style={{ marginBottom: "10px" }}
          onClick={connectMetamask}
        >
          Open Metamask
        </Button>
        <Button
          className="continue"
          variant="outlined"
          onClick={handleIhavePaid}
          sx={{ textTransform: "none" }}
        >
          I have Paid
        </Button>
        <Button
          className="cancelbtn"
          style={{ width: "inherit" }}
          onClick={() => setOpenCloseDialog(true)}
        >
          Cancel
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default BottomSection;
