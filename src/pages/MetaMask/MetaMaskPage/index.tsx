import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";
import CancelPayment from "../../../dialogs/CancelPayment";
import "../../QrScan/QrScanPage.css";
import "../MetaMask.css";
import MetamaskError from "../../../dialogs/MetamaskError";
import Header from "../../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function MetaMaskPage(props: any) {
  const { fixedTime } = props;
  const context = useGlobalContext();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const token = context?.state?.token;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const handleBack = () => {
    navigate("/wallet", { replace: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
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
          <BottomSection setShowErr={setShowErr} />
        </div>
        {openCloseDialog && (
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={fixedTime}
            containerRef={containerRef}
          />
        )}
        {showErr && <MetamaskError error={showErr} setError={setShowErr} />}
      </section>
    </div>
  );
}

export default MetaMaskPage;
