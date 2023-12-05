import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import "./Wallet.css";
import { getMetamaskPaymentDetails } from "../../services/depositServices";
import CancelPayment from "../../dialogs/CancelPayment";
import Loader from "../../utils/Loader";
import Header from "../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function Wallet(props: any) {
  const { fixedTime } = props;
  const context = useGlobalContext();
  const containerRef = React.useRef(null);
  const [isLoading, setLoading] = useState(false);
  const orders = context.state.orderDetails;
  const coinData = context.state.selectedCoinData;
  const hash = context.state.hash;

  const token = context.state.token;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const navigate = useNavigate();

  let network: string;
  let crypto: string;
  let amount: number;

  const fetchMetamaskPaymentDetails = async () => {
    if (orders?.order_currency_type === "virtual") {
      network = orders?.order_currency_network;
      crypto = orders?.order_currency_symbol;
      amount = Number(orders?.order_amount);
    }
    if (orders?.order_currency_type === "fiat") {
      network = coinData?.asset_network;
      crypto = coinData?.asset_symbol;
      amount = Number(coinData?.asset_amount);
    }

    const res: any = await getMetamaskPaymentDetails(
      network,
      crypto,
      amount,
      token
    );
    if (res?.status === 200) {
      context.dispatch({
        type: "GET_QR_DATA",
        payload: res?.data,
      });
      setLoading(false);
    } else {
      navigate("/error", { replace: true });
    }
  };

  const handleBack = () => {
    if (orders?.order_currency_type === "virtual") {
      navigate(`/deposit/order?order_id=${orders?.order_id}&hash=${hash}`, {
        replace: true,
      });
    }
    if (orders?.order_currency_type === "fiat") {
      navigate("/quickpay", { replace: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchMetamaskPaymentDetails();
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (openCloseDialog) {
      window.onbeforeunload = null;
      return;
    }
    window.onbeforeunload = function () {
      const msg = "Are you sure you want to leave?";
      return msg;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [openCloseDialog]);

  return (
    <div className="main_section" ref={containerRef}>
      <section className="sub-section">
        <Header handleClick={handleBack} isDisabled={false} />
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <TopSection fixedTime={fixedTime} />
            <BottomSection setOpenCloseDialog={setOpenCloseDialog} />
          </div>
        )}
        {openCloseDialog && (
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={fixedTime}
            containerRef={containerRef}
          />
        )}
      </section>
    </div>
  );
}

export default Wallet;
