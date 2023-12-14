import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { sendOrderEvent } from "../../services/depositServices";
import Header from "../../components/Header";
import "./Timeout.css";
import BottomSection from "./Components/BottomSection";
import TopSection from "./Components/TopSection";

function Timeout(props: any) {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const token = context.state.token;
  const selectedCoinData = context.state.selectedCoinData;

  const sendTimeoutEvent = async () => {
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "session.timeout",
      asset_network: selectedCoinData?.asset_network,
      asset_symbol: selectedCoinData?.asset_symbol,
      asset_amount: selectedCoinData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status !== 201) {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (token) {
      sendTimeoutEvent();
    }
  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        <TopSection />
        <BottomSection />
      </section>
    </div>
  );
}

export default Timeout;
