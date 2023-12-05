import Footer from "../../../components/Footer/Footer";
import { Button } from "@mui/material";

function BottomSection({ setOpenCloseDialog }: any) {
  return (
    <div className="footer">
      <div className="wallet-btn-container">
        <Button className="continue" variant="contained" fullWidth disabled>
          Continue
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
