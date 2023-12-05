import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import "./QuickPay.css";
import Header from "../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function QuickPay(props: any) {
  const { fixedTime } = props;
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const context = useGlobalContext();
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const orders = context.state.orderDetails;
  const hash = context.state.hash;

  const handleBack = () => {
    navigate(`/deposit/order?order_id=${orders?.order_id}&hash=${hash}`, {
      replace: true,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

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
        <div className="nivapay_section_container">
          <TopSection fixedTime={fixedTime} />
          <BottomSection setOpenCloseDialog={setOpenCloseDialog} />
        </div>
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

export default QuickPay;
