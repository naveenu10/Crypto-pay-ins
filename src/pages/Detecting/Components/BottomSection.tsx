import { Button } from "@mui/material";
import Footer from "../../../components/Footer/Footer";
import OrderDetails from "./OrderDetails";

function BottomSection({ backtoCrypto, orders }: any) {
  return (
    <div className="footer">
       <OrderDetails />
      <div className="subtitle2">
        You may close this window or go back by clicking the button below. We
        are processing this transaction and will update you the final status
        through email.
      </div>
      <div className="footer-subdiv">
        <Button
          variant="contained"
          className="cryptobtn"
          onClick={backtoCrypto}
        >
          {" "}
          Back to {orders?.merchant_brand_name && orders?.merchant_brand_name}
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default BottomSection;
