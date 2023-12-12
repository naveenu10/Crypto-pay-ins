import { Button } from "@mui/material";
import { useGlobalContext } from "../../../../context/context";
import Footer from "../../../../components/Footer/Footer";

function BottomSection(props: any) {
  const {
    chaindid,
    desiredChainId,
    balance,
    isLoading,
    setOpenCloseDialog,
    sendPayment,
  } = props;
  const context = useGlobalContext();
  const paymentDetails = context?.state?.qrData;

  return (
    <div className="footer">
      <div className="footer-buttons-container">
        <Button
          className="continue"
          variant="contained"
          onClick={sendPayment}
          disabled={
            Number(paymentDetails?.asset_amount) >= balance ||
            isLoading ||
            chaindid !== desiredChainId
          }
        >
          {isLoading ? "Processing..." : "Send Payment"}
        </Button>
        <Button
          className="cancelbtn"
          fullWidth
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
