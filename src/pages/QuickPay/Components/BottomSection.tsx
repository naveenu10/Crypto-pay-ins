import PerfectScrollbar from "react-perfect-scrollbar";
import StandardImageList from "./ImageList";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";

function BottomSection(props: any) {
  const { setOpenCloseDialog } = props;
  const navigate = useNavigate();
  const context = useGlobalContext();
  const coinName = context.state.selectedCoin?.toUpperCase();

  const onContinue = () => {
    if (coinName === "ETH" || coinName === "USDC" || coinName === "USDT") {
      navigate("/wallet", { replace: true });
      context.dispatch({
        type: "UPDATE_PREVIOUS_PATH",
        payload: "/wallet",
      });
    } else {
      navigate("/QrMounting", { replace: true });
      context.dispatch({
        type: "UPDATE_PREVIOUS_PATH",
        payload: "/quickpay",
      });
    }
  };

  return (
    <div className="footer">
      <PerfectScrollbar>
        <div>
          <StandardImageList />
        </div>
      </PerfectScrollbar>
      <div className="footer-margin">
        <Button
          variant="contained"
          className="continue"
          fullWidth
          onClick={onContinue}
          disabled={!coinName}
        >
          Continue
        </Button>
        <Button
          fullWidth
          className="cancelbtn"
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
