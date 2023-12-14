import { Button } from "@mui/material";
import formatTitleCase from "../../../utils/formatTitleCase";
import OrderDetails from "./OrderDetails";
import { useGlobalContext } from "../../../context/context";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";

function BottomSection({ setLoading }: any) {
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const [timeFlag, setTimeFlag] = useState(false);

  const backtoCrypto = () => {
    window.location.replace(orders?.merchant_redirect_url);
  };

  const duration = 1 * 30 * 1000;
  const [time, setTime] = useState(duration);
  useEffect(() => {
    setTimeout(() => {
      if (time) {
        setTime(time - 1000);
      } else {
        setTimeFlag(true);
        window.location.replace(orders?.merchant_redirect_url);
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
    <div className="footer">
      <OrderDetails setLoading={setLoading} />
      <div className="success-redirecting">
        Redirecting in <span className="redirecting-time">{fixedTime}</span>{" "}
        <span>secs...</span>
      </div>
      <div className="footer-height">
        <Button
          variant="contained"
          className="cryptobtn"
          onClick={backtoCrypto}
        >
          {" "}
          Back to{" "}
          {orders?.merchant_brand_name &&
            formatTitleCase(orders?.merchant_brand_name)}
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default BottomSection;
