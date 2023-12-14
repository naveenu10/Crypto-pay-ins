import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import "./Detecting.css";
import Loader from "../../utils/Loader";
import {
  getTransactionDetails,
  getTransactionStatus,
} from "../../services/depositServices";
import TopSection from "./Components/TopSection";
import Header from "../../components/Header";
import BottomSection from "./Components/BottomSection";

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const token = context.state.token;
  const orders = context.state.orderDetails;
  const [isLoading, setLoading] = useState(false);
  let interval: any;

  function backtoCrypto() {
    window.location.replace(orders?.merchant_redirect_url);
    clearInterval(interval);
  }

  const fetchTransactionDetails = async () => {
    const res: any = await getTransactionDetails(token);
    if (res.status === 200) {
      context.dispatch({
        type: "UPDATE_TRANSACTION_DETAILS",
        payload: res?.data,
      });
      setLoading(false);
      fetchTransactionStatus();
      interval = setInterval(() => fetchTransactionStatus(), 30000);
    } else {
      setLoading(false);
    }
  };

  const fetchTransactionStatus = async () => {
    const res: any = await getTransactionStatus(token);
    if (res.status === 200) {
      if (res?.data?.order_status === "SUCCESS") {
        navigate("/success", { replace: true });
        clearInterval(interval);
      }
      if (res?.data?.order_status === "FAILED") {
        navigate("/failure", { replace: true });
        clearInterval(interval);
      }
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTransactionDetails();
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <TopSection />
            <BottomSection 
            backtoCrypto={backtoCrypto} 
            orders={orders}
            />
          </div>
        )}
      </section>
   
    </div>
  );
}

export default Detecting;
