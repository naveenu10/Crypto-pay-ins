import { Button } from "@mui/material";
import "../DepositPage.css";
import { sendEmail } from "../../../services/depositServices";
import { useGlobalContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";

function ActionSection(props: any) {
  const { userEmail, handlemodal, validate, setLoading, orderDetails } = props;
  const { order_currency_type, order_currency_symbol } = orderDetails;
  const navigate = useNavigate();
  const context = useGlobalContext();
  const token = context.state.token;

  const proceedOrder = async () => {
    setLoading(true);
    const payload = {
      order_user_email_id: userEmail,
    };
    
    const res: any = await sendEmail(payload, token);
    if (res?.status === 201) {
      if (order_currency_type === "virtual") {
        if (
          order_currency_symbol === "ETH" ||
          order_currency_symbol === "USDC" ||
          order_currency_symbol === "USDT"
        ) {
          navigate("/wallet", { replace: true });
          context.dispatch({
            type: "UPDATE_PREVIOUS_PATH",
            payload: `/deposit/order?order_id=${context.state.orderId}&hash=${context.state.hash}`,
          });
        } else {
          navigate("/QrMounting", { replace: true });
          context.dispatch({
            type: "UPDATE_PREVIOUS_PATH",
            payload: `/deposit/order?order_id=${context.state.orderId}&hash=${context.state.hash}`,
          });
        }
      } else {
        navigate("/quickpay", { replace: true });
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "35px",
        width: "325px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="agree">
        By clicking “Continue”, I agree to Nivapay’s
        <a
          href="https://nivapay.com/terms-of-service/"
          style={{ color: "rgba(0, 0, 0, 0.5)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms{" "}
        </a>
        <br />
        <a
          href="https://nivapay.com/terms-of-service/"
          style={{ color: "rgba(0, 0, 0, 0.5)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          of Service
        </a>{" "}
      </div>
      <Button
        className="continue"
        variant="contained"
        fullWidth
        style={{ width: "100%" }}
        onClick={proceedOrder}
        disabled={!userEmail || !validate.test(userEmail)}
      >
        Continue
      </Button>
      <Button className="cancelbtn1" fullWidth onClick={handlemodal}>
        Cancel
      </Button>
    </div>
  );
}

export default ActionSection;
